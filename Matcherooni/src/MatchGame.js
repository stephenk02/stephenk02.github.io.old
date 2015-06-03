var MSG_TOUCH_CORNER = "msg_touch_corner";
var MSG_TOUCH_HORIZONTAL = "msg_touch_horizontal";
var MSG_TOUCH_VERTICAL = "msg_touch_vertical";
var MSG_REMOVE_BLOCK = "msg_remove_block";
var MSG_NEXT_LETTER = "msg_next_letter";
var MSG_PREV_LETTER = "msg_prev_letter";

var MatchGame = cc.Layer.extend({
	
	_gameScore: null,
	_gameTime:	null,
	_gameOver:  false,
	_paused:	false,

	_currBlocks:null,
	_nextBlocks:null,
	_blockStore:null,
	_blockPool: null,
	
	_grid:null,
	_nextbar:null,
	
	_bgmVol:null,
	_sfxVol:null,
	
    ctor:function () {
		this._super();
		this._gameTime = 0;
		this._gameScore = 50;
		
		this._bgmVol = 0.2;
		this.setTouchEnabled(true);
		
        var size = cc.Director.getInstance().getWinSize();
		
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_EmotesFrames, s_Emotes);
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ExplosionFrames, s_Explosion);
		
		cc.NotificationCenter.getInstance().addObserver(this, this.removeMatchBlock, MSG_REMOVE_BLOCK);
		cc.NotificationCenter.getInstance().addObserver(this, this.dropBlocks, MSG_TOUCH_CORNER);
		cc.NotificationCenter.getInstance().addObserver(this, this.swapBlocks, MSG_TOUCH_VERTICAL);
		cc.NotificationCenter.getInstance().addObserver(this, this.shiftBlocks, MSG_TOUCH_HORIZONTAL);
		cc.NotificationCenter.getInstance().addObserver(this, this.nextLetter, MSG_NEXT_LETTER);
		cc.NotificationCenter.getInstance().addObserver(this, this.prevLetter, MSG_PREV_LETTER);
		
		var hour = new Date().getHours();
		this.scheduleOnce( function() {
			var _start = null;
			var _loop = null;
			var _startLength = null;
			
			//Defining the music variables based on the time of day.
			if (hour <= 4 || hour > 23) {
				_start = s_LateNightStart;
				_loop = s_LateNightLoop;
				//The duration of the track start; when to start playing the loop.
				_startLength = 30.12;
			}
			else if (hour <= 11) {
				_start = s_MorningStart;
				_loop = s_MorningLoop;
				_startLength = 24.65;
			}
			else if (hour <= 18) {
				_start = s_AfternoonStart;
				_loop = s_AfternoonLoop;
				_startLength = 21.9;
			}
			else if (hour > 18) {
				_start = s_NightStart;
				_loop = s_NightLoop;
				_startLength = 6.82;
			}
			
			//Set the music volume to 0 to prevent loudness before it starts to fade in.
			cc.AudioEngine.getInstance().setMusicVolume(0);
			
			//Play the start of a song and then play the loop after the start has finished.
			cc.AudioEngine.getInstance().playMusic(_start, false);
			this.scheduleOnce( function() {
				cc.AudioEngine.getInstance().playMusic(_loop, true);
			}, _startLength)
		}, 0.1 );
		
		this._blockStore = [];
		this._blockPool = [];
		
		this._currBlocks = [];
		this._nextBlocks = [];
		this._currBlocks = this.getRandBlocks();
		this._nextBlocks = this.getRandBlocks();
		
		this._grid = cc.Sprite.create(s_Grid);
		this._grid.setAnchorPoint(0,0);
		this._grid.setPosition(size.width/2 - this._grid.getTextureRect().width /2, size.height/1.874 - this._grid.getTextureRect().height /2);
		gridX = this._grid.getPositionX();
		gridY = this._grid.getPositionY();
		
		//Create the graphical bar which shows the next blocks.
		this._nextbar = cc.Sprite.create(s_NextBar);
		this._nextbar.setAnchorPoint(1,1);// set anchor point to 1,1 to easily latch to top left of block grid.
		this._nextbar.setPosition(this._grid.getPositionX(), this._grid.getPositionY() + this._grid.getTextureRect().height);
		
		this._touchBot = new TouchElement(s_TouchBot, cc.p(this._grid.getPositionX(), this._grid.getPositionY()), MSG_TOUCH_HORIZONTAL, true);
		this._touchSide = new TouchElement(s_TouchSide, cc.p(this._grid.getPositionX() + this._grid.getTextureRect().width, this._grid.getPositionY() + this._grid.getTextureRect().height / 20), MSG_TOUCH_VERTICAL, false);
		this._touchCorner = new TouchElement(s_TouchCorner, cc.p(0,0), MSG_TOUCH_CORNER);
		
		this._touchBot.setAnchorPoint(0,0);
		this._touchBot.setPositionY(this._grid.getPositionY() - this._touchBot.getTextureRect().height);
		this._touchCorner.setPositionY(this._grid.getPositionY() - this._touchBot.getTextureRect().height);
		this._touchCorner.setPositionX(this._grid.getPositionX() + this._grid.getTextureRect().width - 39);
		
		//Create the text which will show the current game time.
		this._timeText = cc.LabelTTF.create("Time: 0.00", "Arial", 36);
		this._timeText.setColor(cc.c3(0, 255, 0));
		this._timeText.setPosition(size.width * 0.7, size.height * 0.95);
		this._timeText.setAnchorPoint(0,0);
		
		//Create the text which will show the score
		this._scoreText = cc.LabelTTF.create("Score: 0", "Arial", 36);
		this._scoreText.setColor(cc.c3(0, 255, 0));
		this._scoreText.setPosition(size.width * 0.025, size.height * 0.95);
		this._scoreText.setAnchorPoint(0,0);
		
		this._levelText = cc.LabelTTF.create("Level: 1", "Arial", 36);
		this._levelText.setColor(cc.c3(0, 255, 0)); 
		this._levelText.setPosition(size.width * 0.4, size.height * 0.95);
		this._levelText.setAnchorPoint(0,0);
		
		this.addChild(this._grid, -1);
		this.addChild(this._nextbar, 0);
		this.addChild(this._touchBot, 0);
		this.addChild(this._touchSide, 0);
		this.addChild(this._touchCorner, 0);
		this.addChild(this._timeText, 1);
		this.addChild(this._scoreText, 1);
		this.addChild(this._levelText, 1);
		
		this._blockTick = 0;
		this._blockTickInterval = 0.7;
		
		this._boardSettled = true;
		this._numExploding = 0;
		
		this._blockTickLevel = 1;
		this._toNextLevel = 0; //Counts blocks until next speed level.
		this._levelRequirement = 10 //Amount of blocks before next level.
		
		this._pauseDelay = 0;
		
		this._gameOver = false;
		
		this._startButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("start_up.png"),
			cc.Sprite.createWithSpriteFrameName("start_down.png"),
			function() {
				this.setPaused(false);
			}, this);

		this._quitButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("quit_up.png"),
			cc.Sprite.createWithSpriteFrameName("quit_down.png"), this.quitToMainMenu, this);
		this._startButton.setScale(0.75);
		this._quitButton.setScale(0.75);
        this._menu = cc.Menu.create(this._startButton, this._quitButton);
        this._menu.alignItemsHorizontallyWithPadding(size.width / 11);
        this._menu.setPosition(size.width/2, size.height / 9);
			
		this._okayButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("okay_up.png"),
			cc.Sprite.createWithSpriteFrameName("okay_down.png"), this.saveScore, this);
		this._okayButton.setScale(0.5);
        this._hiScoreButton = cc.Menu.create(this._okayButton);
		
		this._hiScoreMenu = cc.Menu.create();
		this._hiScoreBoxes = [];
		
		for (var i = 11; i >= 0 ; i--) {
			this._hiScoreBoxes[i] = new LetterBlock();
			this._hiScoreBoxes[i].setActive(false);
		}
		this._hiScoreBoxes[0].setActive(true);
		//Defining an invisible label that will handle keyboard input for hi-scores.
		this._hiScoreInvis = cc.TextFieldTTF.create("", "Arial", 10);
		this._hiScoreInvis.setDelegate(this);
		
		this._hiScoreMenu.initWithArray(this._hiScoreBoxes);
		this._hiScoreMenu.alignItemsHorizontallyWithPadding(-0.5);
        this._hiScoreText  = cc.LabelTTF.create("New High Score! Put your name in.", "Arial", 34);
		this._hiScoreScore = cc.LabelTTF.create("", "Arial", 54);
		this._hiScoreScore.setColor(cc.c3(40, 200, 40));
		
		this._hiScoreScore.setPosition(size.width/2, size.height/1.845);
		this._hiScoreText.setPosition( size.width/2, size.height/1.625);
		
		this._hiScorePrev = new TouchElement(s_SelectArrowSide, cc.p(0,0), MSG_PREV_LETTER);
		this._hiScorePrev.setFlippedX(true);
		this._hiScorePrev.setAnchorPoint(1,0);
		this._hiScoreNext = new TouchElement(s_SelectArrowSide, cc.p(0,0), MSG_NEXT_LETTER);
		
		Block._explosionFrames = [];
		for (var i = 1; i < 6; i++)
		{
			var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("sprite" + i + ".png");
			Block._explosionFrames.push(frame);
		}
		
		//Create the pause overlay. In this case just a transparent black box.
        this._pauseOverlay = cc.Sprite.create(s_Box);
        this._pauseOverlay.setPosition(size.width/2, size.height/2);
		//Make it crazy big cause I can't be bothered measuring it, nor does it make a difference.
        this._pauseOverlay.setScale(200);
		this._pauseOverlay.setColor(cc.c3(0,0,0)); //Tint it black.
		this._pauseOverlay.setOpacity(128); //Make it transparent.
		
		
        this._gameOverOverlay = cc.Sprite.create(s_Box);
        this._gameOverOverlay.setPosition(size.width/2, size.height/2);
		this._gameOverOverlay.setScale(20, 5);
		this._gameOverOverlay.setColor(cc.c3(0,0,0)); //Tint it black.
		this._gameOverOverlay.setOpacity(200); //Make it transparent.
		
		this._gameOverText = cc.LabelTTF.create("Game Over", "Arial", 96);
		this._gameOverText.setColor(cc.c3(255,40,40));
		this._gameOverText.setPosition(size.width/2, size.height/2)
		
		this.setKeyboardEnabled(true);
		
		for(var i = 0; i < this._currBlocks.length; i++)
		{
			this._currBlocks[i].setCol(3);
			this._currBlocks[i].setRow(9 + i);
			this.addChild(this._currBlocks[i],0);
											 
			this._nextBlocks[i].setPosition(this._grid.getPositionX() - this._nextBlocks[i].getTextureRect().width, 
											this._grid.getPositionY() - (this._nextBlocks[i].getTextureRect().height + 5) 
										 * (this._currBlocks.length - i) + this._grid.getTextureRect().height)
			
			this._nextBlocks._explosionSprite = null;
			this.addChild(this._nextBlocks[i],0);
		}
		
		this.scheduleUpdate();
        return this;

		//if window loses focus keyboard input will fail, gotta fix that :^)
	},
	
	update:function(dt) {		
		if (this._gameTime < 1 ) {
			cc.AudioEngine.getInstance().setMusicVolume(this._gameTime * this._bgmVol)
		}
		
		this._pauseDelay += dt;
		if (!this._paused && !this._gameOver)
		{
			this._gameTime += dt;
			this._blockTick += dt;
			if (this._toNextLevel > this._levelRequirement)
			{
				this._blockTickLevel += 1;
				this._toNextLevel = 0;
				this._levelText.setString("Level: " + this._blockTickLevel);
			}
			if ( (this._blockTick > (this._blockTickInterval * 1 / (this._blockTickLevel / 4 + 0.75))) 
			   ||(this._blockTickOverride && this._blockTick > 0.035) ) {
			   
				this.shiftBoard();
				//Check for matches after the board has been shifted into place.
				this.checkMatches();
				if (this._numExploding === 0 && this._boardSettled) {
						
					this.checkGameOver();
					
					if (this._currBlocks[0] != null)
					{
						//If the space below is not -1, the return value for an empty slot, set blockstate to Normal, meaning it won't move.
						if (this.checkRowCol(this._currBlocks[0].getRow()-1, this._currBlocks[0].getCol()) != -1)
							for(var i = 0; i < this._currBlocks.length; i++)
								this._currBlocks[i].setBlockState( BlockState.Normal );
								
						if (this._currBlocks[0].getBlockState() != BlockState.Normal)
							for(var i = 0; i < this._currBlocks.length; i++)
								this._currBlocks[i].setRow( this._currBlocks[i].getRow() - 1 );
								
						else if (this._blockStore.length < 70)
						{
							for(var i = 0; i < this._currBlocks.length; i++)
							{
								this._blockStore.push(this._currBlocks[i]);
								
								//Here we check the pool of removed blocks and reuse them if they are found.
								if (this._blockPool.length === 0)
									this._currBlocks[i] = new Block(this._nextBlocks[i].getBlockType());
								else
								{
									this._currBlocks[i] = this._blockPool.shift();
									this._currBlocks[i].init(this._nextBlocks[i].getBlockType());
									this._currBlocks[i].runAction(cc.FadeIn.create(0.01));
								}
								this._currBlocks[i]._explosionSprite.setPosition(this._currBlocks[i].getTextureRect().width/2, this._currBlocks[i].getTextureRect().height/2)
								
								this._nextBlocks[i].randomise();
								this._currBlocks[i].setCol(3);
								this._currBlocks[i].setRow(9 + i);
								this.addChild(this._currBlocks[i]);
							}
						}//End the game if theres more blocks than there are possible to fit.
						else this.gameOver();
					}
				}
				//Check matches after the blocks have hit their spot.
				this.checkMatches();
				this._blockTick = 0;
			}
			
			//Accounting for removal of milliseconds when theyre at .00
			if ( Math.round(100*this._gameTime)/100 === Math.round(this._gameTime))
				this._timeText.setString("Time: " + Math.round(100*this._gameTime)/100 + ".00");
			else if ( Math.round(100*this._gameTime)/100 === Math.round(10*this._gameTime)/10)
				this._timeText.setString("Time: " + Math.round(100*this._gameTime)/100 + "0");
			else
				this._timeText.setString("Time: " + Math.round(100*this._gameTime)/100);
		}
	},
	
	onKeyDown:function(key) {
		switch(key) {
			case cc.KEY.escape: {
				if (this._pauseDelay > 0.2)
					this.setPaused(!this._paused);
				break;
			}
			case cc.KEY.up: { this.swapBlocks(true); break; }
			case cc.KEY.down: { this.swapBlocks(false); break; }
			case cc.KEY.left: { this.shiftBlocks(false); break; }
			case cc.KEY.right: { this.shiftBlocks(true); break; }
			case cc.KEY.shift: { this.dropBlocks(true); break; }
			default: break;
		}
	},
	
	onKeyUp:function(key) {
		if (key === cc.KEY.shift && this._blockTickOverride)
			this.dropBlocks(false);
	},
	
	//Sets the block override, so block 'ticks' occur at a much faster rate.
	dropBlocks:function(flag) {
		//Case handling.
		if (this._currBlocks[0] === null || this._currBlocks[0].getBlockState() !== BlockState.Moving) return;
		
		//This function is used with both the keyDown and touchElement classes.
		//Need to check if the arg is a bool or the touchElement class.
		if (flag._plusDir !== undefined) { flag = flag._plusDir };
		
		this._blockTickOverride = flag;
	},
	
	swapBlocks:function(plusDir) {
		//Don't do anything if the game is paused or the active blocks are null.
		if (this._paused || this._gameOver || this._currBlocks[0] === null) { return; }
		
		//This function is used with both the keyDown and touchElement classes.
		//Need to check if the arg is a bool or the touchElement class.
		if (typeof(plusDir) !== "boolean")
			plusDir = plusDir._plusDir
		
		//Swap up if + dir, else swap down if - dir.
		if (plusDir) {
			var temp = this._currBlocks[this._currBlocks.length-1].getBlockType();
			for (i = this._currBlocks.length-1; i > 0 ; i--)
				this._currBlocks[i].setBlockType(this._currBlocks[i-1].getBlockType());
				
			this._currBlocks[0].setBlockType(temp);
		}
		else {
			var temp = this._currBlocks[0].getBlockType();
			for (i = 0; i < this._currBlocks.length-1 ; i++)
				this._currBlocks[i].setBlockType(this._currBlocks[i+1].getBlockType());
				
			this._currBlocks[this._currBlocks.length-1].setBlockType(temp);
		}
	},
	
	shiftBlocks:function(plusDir) {
		//Don't do anything if the game is paused or the active blocks are null.
		if (this._paused || this._gameOver || this._currBlocks[0] === null) { return; }
		
		//Checking typeof for same reason as above.
		if (typeof(plusDir) !== "boolean")
			plusDir = plusDir._plusDir
		
		//Shift right if + dir, else shift left if - dir, checking if there is an empty spot to shift into.
		if (plusDir) {
			if (this.checkRowCol(this._currBlocks[0].getRow(), this._currBlocks[0].getCol() + 1) === -1)
				for (i = 0; i < this._currBlocks.length ; i++)
					this._currBlocks[i].setCol(this._currBlocks[i].getCol() + 1);
		}
		else {
			if (this.checkRowCol(this._currBlocks[0].getRow(), this._currBlocks[0].getCol() - 1) === -1)
				for (i = 0; i < this._currBlocks.length ; i++)
					this._currBlocks[i].setCol(this._currBlocks[i].getCol() - 1);
		}
	},
	
	setPaused:function(pause) {
		if (this._gameOver) return;
		this._paused = pause
		if (pause) {
			//Add the buttons and pause overlay to the scene.
			this.addChild(this._menu, 3)
			this.addChild(this._pauseOverlay, 2);
			//Set the music to a fraction of its current volume and pause all sfx.
			cc.AudioEngine.getInstance().setMusicVolume(cc.AudioEngine.getInstance().getMusicVolume() / 4);
			cc.AudioEngine.getInstance().pauseAllEffects();
		}
		else {
			//Remove menu objects from scene.
			this.removeChild(this._menu);
			this.removeChild(this._pauseOverlay);
			//Set the volume back to its original amount.
			cc.AudioEngine.getInstance().setMusicVolume(cc.AudioEngine.getInstance().getMusicVolume() * 4);
			cc.AudioEngine.getInstance().resumeAllEffects();
		}
		this._pauseDelay = 0; //Set the pause timer to 0, so the player has to wait again to pause.
	},
	
	gameOver:function() {
		this._gameOver = true;
		this.addChild(this._pauseOverlay, 2);
		this.addChild(this._gameOverOverlay, 2);
		this.addChild(this._gameOverText, 3);
		this.scheduleOnce( function() {
			if (this._gameScore > lowestHiScore)
				this.hiScoreInit();
			else this.quitToMainMenu();
		}, 3)
	},
	
	hiScoreInit:function() {
		
		var size = cc.Director.getInstance().getWinSize()
		cc.AudioEngine.getInstance().setMusicVolume(cc.AudioEngine.getInstance().getMusicVolume() / 4);
		this._gameOverOverlay.setScale(20, 10);
		this.removeChild(this._gameOverText);
		
		this._hiScoreScore.setString(this._gameScore);
		this._hiScorePrev.setPosition(this._hiScoreMenu.getPositionX() - 400, size.height / 2.2)
		this._hiScoreNext.setPosition(this._hiScoreMenu.getPositionX() + 400, size.height / 2.2)
		
		this.addChild(this._hiScoreText, 3);
		this.addChild(this._hiScoreScore, 3);
		this.addChild(this._hiScoreMenu, 3);
		this.addChild(this._hiScoreButton,4);
		this.addChild(this._hiScoreNext, 4);
		this.addChild(this._hiScorePrev, 4);
		
		this._hiScoreButton.setPosition(size.width/2, size.height/2.7)
		this._hiScoreMenu.setPositionY(size.height / 2.2);
		this._hiScoreInvis.attachWithIME();
	},
	
	nextLetter:function() {
		for (var i = 0 ; i < this._hiScoreBoxes.length ; i++) {
			if (this._hiScoreBoxes[i]._activeBlock && i != 11) {
				this._hiScoreBoxes[i].setActive(false);
				this._hiScoreBoxes[i+1].setActive(true);
			}
		}
	},
	
	prevLetter:function() {
		for (var i = 0 ; i < this._hiScoreBoxes.length ; i++) {
			if (this._hiScoreBoxes[i]._activeBlock ) {
				this._hiScoreBoxes[i].setLetter("");
				if (i != 0) {
					this._hiScoreBoxes[i].setActive(false);
					this._hiScoreBoxes[i-1].setActive(true);
				}
			}
		}
	},
	
	saveScore:function() {
		var name = "";
		for (var i = 0 ; i < this._hiScoreBoxes.length ; i++) {
			name += this._hiScoreBoxes[i].getLetter();
		}
		var tempArray = []
		for (var i = 9 ; i >= 0 ; i--) {
			tempArray[i] = getLocal("score" + i, false);
			if( JSON.parse(tempArray[i][0]) > this._gameScore )
			{
				for (var j = 9 ; j >= i + 2 ; j--) {
					saveLocal("score" + j, getLocal("score" + j - 1, false));
				}
				saveLocal("score" + (i + 1), JSON.stringify([JSON.stringify(this._gameScore), name]));
			}
			else if (i === 0 )
			{
				for (var j = 9 ; j >= i + 1 ; j--) {
					saveLocal("score" + j, getLocal("score" + j - 1, false));
				}
				saveLocal("score" + (i), JSON.stringify([JSON.stringify(this._gameScore), name]));
			}
		}
		
		this.quitToMainMenu();
	},
	
	quitToMainMenu:function() {
		cc.AudioEngine.getInstance().stopAllEffects();
		cc.AudioEngine.getInstance().stopMusic();
		SceneTransition(new MainMenu, cc.TransitionCrossFade, 0.4);
	},
	
	getRandBlocks:function() {
		var temp = [];
		for (var i = 0; i < 3 ; i++) { 
			temp.push(new Block(Math.floor((Math.random()*6)))); 
			temp[i]._explosionSprite.setPosition(temp[i].getTextureRect().width/2, temp[i].getTextureRect().height/2)
		}
		return temp;
	},
	
	shiftBoard:function()
	{
		var settled = true
		for (var i in this._blockStore)
		{
			//If the checkRowCol returns nothing then shift the blocks down.
			if (this.checkRowCol(this._blockStore[i].getRow()-1, this._blockStore[i].getCol()) === -1)
			{
				this._blockStore[i].setRow(this._blockStore[i].getRow()-1);
				settled = false;
			}
		}
		this._boardSettled = settled;
	},
	
	checkMatches:function()
	{
		if (!this._boardSettled) return; //Don't match blocks if things are still falling into place.
		var match = false
		for (var i in this._blockStore)
		{
			var block = [];
			block[0] = this._blockStore[i]
			for (var k in this._blockStore)
			{
				block[1] = this._blockStore[k]
				//Look at all blocks 1 away from the origin. Are they the same type? Are they static?
				//We check if these two are NOT moving, as exploding blocks should
				//still match with other static blocks. (e.g. a + formation match)
				if ( block[0] != block[1] && block[0].getBlockType() === block[1].getBlockType() 
					&& (block[0].getBlockState() !== BlockState.Moving && block[1].getBlockState() !== BlockState.Moving)
					&& (Math.abs(block[0].getRow() - block[1].getRow()) <= 1 && Math.abs(block[0].getCol() - block[1].getCol()) <= 1) )
				{
					if (this.checkMatchesInDir(block[0], block[1], 1))
					{
						//If a block is used in 2 matches it will throw off the count unless this check is done.
						if (block[0].getBlockState() !== BlockState.Exploding) {
							block[0].setBlockState(BlockState.Exploding);
							this._numExploding++;
							this._toNextLevel++;
						}
						if (block[1].getBlockState() !== BlockState.Exploding) {
							block[1].setBlockState(BlockState.Exploding);
							this._numExploding++;
							this._toNextLevel++;
						}
						this._boardSettled = false;
						match = true;
					}
				}
			}
		}
		//The effect is played out of the loop so only one instance of it is played.
		if (match) cc.AudioEngine.getInstance().playEffect(s_BlockBreak, false);
		return match;
	},
	
	checkGameOver:function() {
		var over = false
		for (var i = 0 ; i < 7 ; i++) {
			//Is there a block occupying a spot outside the grid?
			if (this.checkRowCol(10, i) != -1) {
				over = true;
				for (var j = 0 ; j < 10 ; j++) {
					//If any block below the current is empty, the game is not over.
					if (this.checkRowCol(j, i) === -1) over = false
				}
			}
		}
		if (over) this.gameOver()
	},
	
	//Recursive function to match blocks
	checkMatchesInDir:function(block1, block2, depthCount)
	{	
		if (depthCount > 7) return;
		//Get the block in the direction of 1 to 2.
		var block3 = this.getBlockDir(block1, block2.getRow(), block2.getCol());
		
		//If the block is the same type and stationary, execute code and check for another block.
		if (block3 != null && block3.getBlockType() === block1.getBlockType() && block3.getBlockState() === BlockState.Normal) {
			if (block3.getBlockState() != BlockState.Exploding) { //Error prevention.
				this._numExploding++;
				this._toNextLevel++;
			}
			block3.setBlockState(BlockState.Exploding);
			this.checkMatchesInDir(block2, block3, depthCount+1)
			return true;
		}
		return false;
	},
	
	//Checks the specified grid coord for a block, and returns the block's array key if it exists.
	checkRowCol:function(row, col)
	{
		//We dont clamp the top row of the grid, because blocks need to fall from above it.
		if (row < 0 || col < 0 || col > 6) return false;
		for (var i in this._blockStore)
		{
			if (this._blockStore[i].getRow() === row && this._blockStore[i].getCol() === col)
			{
				return i;
			}
		}
		return -1; //Empty, so return -1 for empty type
	},
	
	//Convenience function for getting a block id offset from another block, using something akin to vector positional math.
	getBlockDir:function(block, offRow, offCol)
	{
		return this._blockStore[this.checkRowCol(offRow + (offRow - block.getRow()), offCol + (offCol - block.getCol()))]
	},

	removeMatchBlock:function(block)
	{
		this._blockPool.push(block); //Push the removed block onto a pool, for remaking later.
		this.removeChild(block); //Stop rendering the block.
		block.removeAllChildren();
		//Remove from the blockStorage. It no longer affects gameplay.
		this._blockStore.splice(this.checkRowCol(block.getRow(), block.getCol()), 1); 
		
		if (this._numExploding > 3)
			this._gameScore += (this._numExploding - 3) * 150;
		else
			this._gameScore += 100;
		
		this._scoreText.setString("Score: " + this._gameScore);
		this._numExploding--;
	},	
	
	onTextFieldInsertText:function (sender, text, len) {
		// if insert enter, treat as default to detach with ime
		if ('\n' == text) {
			if (this._hiScoreBoxes[0].getLetter() != "") {
				this.saveScore();
			}
			return false;
		}
		
		for (var i = 0 ; i < this._hiScoreBoxes.length ; i++) {
			if (this._hiScoreBoxes[i].getLetter() == "" || i == this._hiScoreBoxes.length-1) {
				this._hiScoreBoxes[i].setLetter(text);
				break;
			}
		}

		// if the textfield's char count more than m_nCharLimit, doesn't insert text anymore.
		if (sender.getCharCount() >= 12) {
			return true;
		}
		return false;
	},
	
	onTextFieldDeleteBackward:function (sender, delText, len) {
		for (var i = 0 ; i < this._hiScoreBoxes.length ; i++) {
			if (i != 0 && (this._hiScoreBoxes[i].getLetter() == "")) {
				this._hiScoreBoxes[i-1].setLetter("");
				break;
			}
			else if (i == this._hiScoreBoxes.length-1) {
				this._hiScoreBoxes[i].setLetter("");
				break;
			}
		}
		return false;
	},
	
	//reattach IME if mouse reclicks during gameover (this detatches the IME).
	onTouchBegan:function(touch, event) {
		if (this._gameOver) {
			this._hiScoreInvis.detachWithIME();
			this._hiScoreInvis.attachWithIME();
		}
	},
	
	//Register for touching
	onEnter:function() {
		cc.registerTargetedDelegate(1,true,this);
		this._super();		
	},
	onExit:function() {
		cc.unregisterTouchDelegate(this);
		this._super();
	},

	onDraw:function (sender) {
		return false;
	},
	
	onTextFieldAttachWithIME:function (sender) {
		return false;
	},
	
	onTextFieldDetachWithIME:function (sender) {
		return false;
	},
})