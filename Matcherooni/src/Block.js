var BlockType = {"Kappa":0,"FrankerZ":1,"BibleThump":2,"Kreygasm":3,"KevinTurtle":4,"MVGame":5};
var BlockState = {"Normal":0, "Moving":1, "Exploding":2};

var Block = SpriteExt.extend({
	_blockType: null,
	_blockState:null,	
	
	_blockSprite:null,
	_overlaySprite:null,
	_explosionSprite:null,
	
	_row: null,
	_col: null,
	
	ctor:function(blockType)
	{
		this._super();
		this.initWithFile(s_Block);
		this.init(blockType);
	},
	
	init:function(blockType)
	{
		this._overlaySprite = cc.Sprite.create();
		this._overlaySprite.setAnchorPoint(0,0);	
		
		this._explosionSprite = cc.Sprite.create();
		//this._explosionSprite.setPosition(20, 20);
		
		this._explosionSprite.setScale(2, 2);
		
		this.setBlockType(blockType);
		this.setBlockState(BlockState.Moving);
		this.setAnchorPoint(0,0);
		
		this.addChild(this._overlaySprite, 1);
		this.addChild(this._explosionSprite, 1);
	},
	
	//Block type setting function. Switches between faces.
	setBlockType:function(blockType)
	{
		this._blockType = blockType;
		var cache = cc.SpriteFrameCache.getInstance();
		switch (blockType)
		{
			//These cases set the colour of the block sprite and change the overlay sprite to match.
			case BlockType.Kappa:
				this.setColor(cc.c3(198,198,198));
				this._overlaySprite.setDisplayFrame(cache.getSpriteFrame("Kappa.png"));
				break;
			case BlockType.FrankerZ:
				this.setColor(cc.c3(200,070,200));
				this._overlaySprite.setDisplayFrame(cache.getSpriteFrame("FrankerZ.png"));
				break;
			case BlockType.BibleThump:
				this.setColor(cc.c3(200,075,075));
				this._overlaySprite.setDisplayFrame(cache.getSpriteFrame("BibleThump.png"));
				break;
			case BlockType.Kreygasm:
				this.setColor(cc.c3(255,200,050));
				this._overlaySprite.setDisplayFrame(cache.getSpriteFrame("Kreygasm.png"));
				break;
			case BlockType.KevinTurtle:
				this.setColor(cc.c3(050,050,200));
				this._overlaySprite.setDisplayFrame(cache.getSpriteFrame("KevinTurtle.png"));
				break;
			case BlockType.MVGame:
				this.setColor(cc.c3(000,200,000));
				this._overlaySprite.setDisplayFrame(cache.getSpriteFrame("MVGame.png"));
				break;
			default:
				break;
		}
	},
	
	getBlockType:function() { return this._blockType; },
	
	setBlockState:function(state) { 
		this._blockState = state;
		switch (this._blockState)
		{
			case BlockState.Exploding:
				this.runAction(cc.FadeOut.create(0.2));
				// creating a sequence
				this._explosionSprite.runAction(cc.Sequence.create(
					cc.FadeIn.create(0.1),
					cc.Animate.create(cc.Animation.create(Block._explosionFrames, 0.045)),
					cc.FadeOut.create(0.01),
					cc.CallFunc.create(this.onExplodeEnd.bind(this),this)
				));
				this._overlaySprite.setVisible(false);
				break;
			default:
				break;
		}
	},
	
	getBlockState:function() { return this._blockState;},
	
	setRow:function(row) { 
		this._row = row;
		this.setPositionY( gridY + this.getTextureRect().height / 13.8 + (this.getTextureRect().height + this.getTextureRect().height / 13.8) * row, gridY )
	},
	
	getRow:function() { return this._row; },
	
	setCol:function(col) {
		this._col = col;
		this.setPositionX( gridX + this.getTextureRect().height / 13.8 + (this.getTextureRect().width + this.getTextureRect().width / 13.8) * col, gridY )
	},
	
	getCol:function() { return this._col; },
	
	randomise:function() { this.setBlockType(Math.floor((Math.random()*6))); },
	
	onExplodeEnd:function() {
		cc.NotificationCenter.getInstance().postNotification(MSG_REMOVE_BLOCK, this);
	}
});