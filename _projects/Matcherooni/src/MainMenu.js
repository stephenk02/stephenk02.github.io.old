var gameLoaded = false;
var loadedHour = -1;
var lowestHiScore = 0;

var MainMenu = LayerExt.extend({
	_parsedResult:null,
	
	//firstTime is only passed in if the menu transitions from the splash screen
    ctor:function () {
        this._super();
        // get the window size
        var size = cc.Director.getInstance().getWinSize();
        //var bg = cc.Sprite.create('res/menu_background.png');
        // positions the center of the background with the center of the screen
        //bg.setPosition(size.width/2, size.height/2);
        //// scale the image to fit the height of the screen
        //bg.setScale(size.height/bg.getContentSize().height);
        // Font Item
		cc.SpriteFrameCache.getInstance().addSpriteFrames(s_MenuButtonFrames, s_MenuButtons);

        // add a "close" icon to exit the progress. it's an autorelease object
		
        this._titleLabel = cc.LabelTTF.create("HighScores", "Impact", 76);
        this._titleLabel.setPosition(size.width / 2, size.height - size.height / 22);
        this.addChild(this._titleLabel);
			
		this._grid = cc.Sprite.create(s_Grid);
		this._grid.setAnchorPoint(0,0);
		this._grid.setPosition(size.width/2 - this._grid.getTextureRect().width /2, size.height/1.874 - this._grid.getTextureRect().height /2);
		this.addChild(this._grid, -1);
		
		this._loading = false;
		
		this._startButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("start_up.png"),
			cc.Sprite.createWithSpriteFrameName("start_down.png"),
			function() {
				//Getting the hour of day and loading the correct music for the game to play, via an extended utility function.
				var hour = new Date().getHours();
				
				//Stops from loading assets after the game has already been played once.
				if (gameLoaded && loadedHour == hour) { 
					SceneTransition(new MatchGame, cc.TransitionCrossFade, 0.4); 
					return;
				}
				gameLoaded = true;
				loadedHour = hour;
				if (hour <= 4 || hour > 23)
					this.startLoading(MatchGame, g_game.concat([{src:s_LateNightStart}, {src:s_LateNightLoop}]), "Only a dangerous man is up this late...");
				else if (hour <= 11)
					this.startLoading(MatchGame, g_game.concat([{src:s_MorningStart}, {src:s_MorningLoop}]), "Lovely morning for some tetris beats...");
				else if (hour <= 18)
					this.startLoading(MatchGame, g_game.concat([{src:s_AfternoonStart}, {src:s_AfternoonLoop}]), "Afternoons are great for chillin'.");
				else if (hour > 18)
					this.startLoading(MatchGame, g_game.concat([{src:s_NightStart}, {src:s_NightLoop}]), "The night is when things come alive.");
				this._startButton.setEnabled(false);
				this._aboutButton.setEnabled(false);
			}, this);
		
        this._aboutText = cc.LabelTTF.create("By Stephen Koren, 2014", "Arial", 36);
		this._aboutText.setPosition(size.width/2, size.height/2.5);
		this._aboutCIT = cc.Sprite.create(s_CIT);
		this._aboutCIT.setPosition(size.width/2.9, size.height/1.8);
		this._aboutCIT.setScale(0.92);
		this._aboutAIE = cc.Sprite.create(s_AIE);
		this._aboutAIE.setPosition(size.width/1.55, size.height/1.8);
		this._aboutAIE.setScale(0.63);

		this._aboutButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("about_up.png"),
			cc.Sprite.createWithSpriteFrameName("about_down.png"),
			function() {
				this.addChild(button, 2);
				this.addChild(this._aboutAIE, 2);
				this.addChild(this._aboutCIT, 2);
				this.addChild(this._aboutText, 2);
				this.addChild(this._aboutUnderlay, 1);
				this._startButton.setEnabled(false);
				this._aboutButton.setEnabled(false);
			}, this);
		
        this._aboutClose = cc.MenuItemImage.create(
            s_CloseNormal,
            s_CloseSelected,
            function () {
				this.removeChild(button);
				this.removeChild(this._aboutAIE);
				this.removeChild(this._aboutCIT);
				this.removeChild(this._aboutText);
				this.removeChild(this._aboutUnderlay);
				this._startButton.setEnabled(true);
				this._aboutButton.setEnabled(true);
            },this);
        var button = cc.Menu.create(this._aboutClose);
        button.setPosition(0, 0);
        this._aboutClose.setPosition(size.width - 20, size.height/1.6);
		
		this._startButton.setScale(0.75);
		this._aboutButton.setScale(0.75);
		
		this._aboutUnderlay = cc.Sprite.create(s_Box);
		this._aboutUnderlay.setPosition(size.width/2, size.height/2);
		this._aboutUnderlay.setScale(20, 10);
		this._aboutUnderlay.setColor(cc.c3(0,0,0));
		this._aboutUnderlay.setOpacity(240);
		
		//High score initialisation
		this._highScores = [];
		this._highScoreNames = [];
		
		for (var i = 0 ; i < 10 ; i++)
		{
			cc.MenuItemFont.setFontName("Consolas");
			cc.MenuItemFont.setFontSize(40);
			var scoreArray = getLocal("score" + i, false);
			if (scoreArray) {
				this._highScores[i]  	= cc.MenuItemFont.create(scoreArray[0]);
				this._highScoreNames[i] = cc.MenuItemFont.create(scoreArray[1]);
			}
			else {
				this._highScores[i]  = cc.MenuItemFont.create(10000 - (i * 750));
				switch(i){
					case 0:
						this._highScoreNames[0] = cc.MenuItemFont.create("Kappa");
						break;
					case 1:
						this._highScoreNames[1] = cc.MenuItemFont.create("FrankerZ");
						break;
					case 2:
						this._highScoreNames[2] = cc.MenuItemFont.create("KevinTurtle");
						break;
					case 3:
						this._highScoreNames[3] = cc.MenuItemFont.create("Kreygasm");
						break;
					case 4:
						this._highScoreNames[4] = cc.MenuItemFont.create("MVGame");
						break;
					case 5:
						this._highScoreNames[5] = cc.MenuItemFont.create("DatSheffy");
						break;
					case 6:
						this._highScoreNames[6] = cc.MenuItemFont.create("RitzMitz");
						break;
					case 7:
						this._highScoreNames[7] = cc.MenuItemFont.create("DansGame");
						break;
					case 8:
						this._highScoreNames[8] = cc.MenuItemFont.create("FailFish");
						break;
					case 9:
						this._highScoreNames[9] = cc.MenuItemFont.create("BibleThump");
						break;
					default:
						this._highScoreNames[i] = cc.MenuItemFont.create("Keepo");
						break;
				}
				saveLocal("score" + i, JSON.stringify([this._highScores[i].getLabel().getString(), this._highScoreNames[i].getLabel().getString()]));
			}
			var posY = (this._grid.getTextureRect().height / 10) * 10 - (this._grid.getTextureRect().height / 10) * i;
			this._highScores[i].setEnabled(false);
			this._highScores[i].setPositionY(posY);
			this._highScores[i].setColor(cc.c3(150,150,150));
			this._highScoreNames[i].setEnabled(false);
			this._highScoreNames[i].setPositionY(posY);
			this._highScoreNames[i].setColor(cc.c3(255,255,255));
		}
		lowestHiScore = JSON.parse(this._highScores[9].getLabel().getString());
		cc.log(lowestHiScore);
			
		this._highScoreMenu = cc.Menu.create();
		this._highScoreMenu.initWithArray(this._highScores);
		this._highScoreName = cc.Menu.create();
		this._highScoreName.initWithArray(this._highScoreNames);
		
        this._menu = cc.Menu.create(this._startButton, this._aboutButton);
        this._menu.alignItemsHorizontallyWithPadding(size.width / 11);
		
        //this.addChild(bg);
        this.addChild(this._menu);
        this.addChild(this._highScoreMenu);
        this.addChild(this._highScoreName);
        this._menu.setPosition(size.width/2, size.height / 9);
		this._highScoreMenu.setPosition(size.width / 1.3, this._grid.getPositionY() - (this._grid.getTextureRect().height / 20));
		this._highScoreName.setPosition(size.width / 3, this._grid.getPositionY() - (this._grid.getTextureRect().height / 20));
        //gHighScore.init();
    },
});