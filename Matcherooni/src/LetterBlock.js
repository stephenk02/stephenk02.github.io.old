var MSG_LETTER_UP = "msg_letter_up"
var MSG_LETTER_DOWN = "msg_letter_down"

var HighScoreCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "

var LetterBlock = cc.MenuItemImage.extend({
	_storedLetter:null,
	_arrowButtons:null,
	_activeBlock:false,
	_currLetter:0,
	
	ctor:function() {
		this._super();
		this.initWithNormalImage(s_Block);
		
		this.setScale(0.75);
		this.setColor(cc.c3(80, 80, 100));
		this._storedLetter = cc.LabelTTF.create("", "Arial", 48);
		this._storedLetter.setPosition(this.getNormalImage().getTextureRect().width/2, 
								      this.getNormalImage().getTextureRect().height/2);
									  
		cc.NotificationCenter.getInstance().addObserver(this, this.letterUp, MSG_LETTER_UP);
		cc.NotificationCenter.getInstance().addObserver(this, this.letterDown, MSG_LETTER_DOWN);
		
		var blockrect = this.getNormalImage().getTextureRect()
		
		this._arrowButtons = [];
		this._arrowButtons[0] = new TouchElement( s_SelectArrow, cc.p(this.getPositionX() + blockrect.width /10, 
																	  this.getPositionY() + blockrect.height), MSG_LETTER_UP );
		this._arrowButtons[1] = new TouchElement( s_SelectArrow, cc.p(this.getPositionX() + blockrect.width /10, 0), MSG_LETTER_DOWN );
		this._arrowButtons[1].setAnchorPoint(0,1);
		this._arrowButtons[1].setFlippedY(true);
		
		this.addChild(this._storedLetter);
		for (var i = 0; i < this._arrowButtons.length ; i++ ) {
			this.addChild(this._arrowButtons[i],2);
			//Set their position to be converted to world coords when considering touch.
			this._arrowButtons[i]._localCoords = true;
			this._arrowButtons[i].setScale(0.8);
		}
		this._currLetter = 0;
		
		this.scheduleUpdate();
	},
	
	//activeBlock needs to be set to ensure every block doesnt 
	//change, as the message will trigger them all otherwise.
	letterUp:function() {
		if (this._activeBlock) 
		{
			this._currLetter += 1;
			if (this._currLetter >= HighScoreCharacters.length) {
				this._currLetter = 0;
			}
			this._storedLetter.setString(this._storedLetter.getString().replace( this._storedLetter.getString(), HighScoreCharacters[this._currLetter]));
		}
	},
	
	letterDown:function() { 
		if (this._activeBlock) 
		{
			this._currLetter -= 1;
			if (this._currLetter <= -1) {
				this._currLetter = HighScoreCharacters.length-1;
			}
			this._storedLetter.setString(this._storedLetter.getString().replace( this._storedLetter.getString(), HighScoreCharacters[this._currLetter]));
		}
	},
	
	setActive:function(active) {
		this._activeBlock = active
		if (active) {
			for (var i = 0; i < this._arrowButtons.length ; i++ ) {
				this.addChild(this._arrowButtons[i],2);
			}
		}
		else {
			for (var i = 0; i < this._arrowButtons.length ; i++ ) {
				this.removeChild(this._arrowButtons[i]);
			}
		}
	},
	
	getLetter:function(){
		return this._storedLetter.getString();
	},
	
	setLetter:function(letter){
		this._storedLetter.setString(letter);
	}
});