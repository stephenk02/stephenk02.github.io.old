var TouchElement = cc.Sprite.extend({
	_position:null,
	_message:null,
	_horizontal:null,
	_sensitivity:4,
	_localCoords:false,
	
	//args: image = texture
	//		position = position of the element
	//		horizontal = horizontal swiping? if null then touch only
	// 		message = global message to send out on touch.
	ctor:function(image, position, message, horizontal) {
		this._super();
		this.initWithFile(image);
		this.setAnchorPoint(0,0);
		if (position != null)
			this.setPosition(position);
		if (message != null)
			this._message = message;
		if (horizontal !== undefined)
			this._horizontal = horizontal;
		this._sensitivity = 0.5;
		this._ticker = 0;
		
		this.scheduleUpdate();
	},
	
	update:function(dt) {
		this._ticker += dt;
	},
	
	//Register this sprite to be touchable.
	onEnter:function() {
		cc.registerTargetedDelegate(1,true,this);
		this._super();		
	},
	onExit:function() {
		cc.unregisterTouchDelegate(this);
		this._super();
	},
	
	onTouchBegan:function(touch, event) {
		if (entContains(this, touch.getLocation(), this._localCoords)) {
			if (this._horizontal === null) {
				this._plusDir = true;//reusing plusDir as a flag for touch begin/end.
				cc.NotificationCenter.getInstance().postNotification(this._message, this);
			}
			return true;
		}
		else { return false; }
	},
	
	onTouchEnded:function(touch, event) {
		//Post the touch end
		if (this._horizontal === null && this._plusDir && !this._localCoords) {
			this._plusDir = false;//touch is ending set it to false.
			cc.NotificationCenter.getInstance().postNotification(this._message, this);
		}
	},
	
	onTouchMoved:function(touch, event) {
		if (this._ticker > 0.1) {
			this._ticker = 0;
			if (this._horizontal === true 
				&& ( touch.getPreviousLocation().x < touch.getLocation().x - this._sensitivity 
				||   touch.getPreviousLocation().x > touch.getLocation().x + this._sensitivity)) 
			{
				//Swiped left or right?
				if ( touch.getPreviousLocation().x < touch.getLocation().x - this._sensitivity )
					this._plusDir = true;
				else
					this._plusDir = false;
					
				cc.NotificationCenter.getInstance().postNotification(this._message, this);
				return true;
			}
			else if (this._horizontal === false 
				&& ( touch.getPreviousLocation().y < touch.getLocation().y - this._sensitivity
				||   touch.getPreviousLocation().y > touch.getLocation().y + this._sensitivity)) 
			{
				//Swiped up or down?
				if ( touch.getPreviousLocation().y < touch.getLocation().y - this._sensitivity)
					this._plusDir = true;
				else
					this._plusDir = false;
					
				cc.NotificationCenter.getInstance().postNotification(this._message, this);
				return true;
			}
		}
		else { return false; }
	}
});