//Extend the sprite class to have width and height variables.
var SpriteExt = cc.Sprite.extend({
	_width: 0,
	_height:0,
	
	setWidth:function(width)
	{
		this._width = width;
	},
	getWidth:function()
	{
		return this._width;
	},
	setHeight:function(height)
	{
		this._height = height;
	},
	getHeight:function()
	{
		return this._height;
	},
});

//Extension of base layer to have support for simple loading screen overlay.
var LayerExt = cc.Layer.extend({
	ctor: function (){
		this._super();
		
        var size = cc.Director.getInstance().getWinSize();
        this._loadingBar = cc.LabelTTF.create("Loading... 0%", "Arial", 64);
        this._loadingBar.setColor(cc.c3(220, 220, 220));
        this._loadingBar.setPosition(size.width / 7, size.height / 1.9);
		this._loadingBar.setAnchorPoint(0,0.5);

        this._loadingFlavour = cc.LabelTTF.create("", "Consolas", 30);
        this._loadingFlavour.setPosition(size.width / 2, size.height / 2.15);
        this._loadingFlavour.setColor(cc.c3(180, 180, 180));
		
		this._loadingUnderlay = cc.Sprite.create(s_Box);
		this._loadingUnderlay.setPosition(size.width/2, size.height/2);
		this._loadingUnderlay.setScale(20, 5);
		this._loadingUnderlay.setColor(cc.c3(0,0,0));
		this._loadingUnderlay.setOpacity(240);
	},

	//Load the new scene with the supplied resource table, adding flavour text below the bar if supplied.
    startLoading: function (newScene, resourceTable, flavourText, hideLoadingBar) {
		this._newScene = newScene;
		this._loading = true;
		
		//Set the flavour text if it's been supplied.
		if (flavourText != null)
			this._loadingFlavour.setString(flavourText);
			
		//Add the loading bar to the screen if not set to be hidden.
		if (!hideLoadingBar)
		{
			this.addChild(this._loadingBar, 5);
			this.addChild(this._loadingFlavour, 5);
			this.addChild(this._loadingUnderlay, 4);
		}
        cc.Loader.preload(resourceTable);
		
		//Schedule schedule updatePercent to run instead of the layer's update.
        this.schedule(this.updatePercent);
		this.unscheduleUpdate();
    },
	
	//Update the loading progress whilst a load is in place.
    updatePercent: function () {
        var percent = cc.Loader.getInstance().getPercentage();
		
		if (!this._hidden)
			this._loadingBar.setString("Loading... " + percent + "%");

		//If the load is complete, stop updating the percentage and transition to the next scene.
        if (percent >= 100)
		{
            this.unschedule(this.updatePercent);
			this.scheduleOnce( function() {
				SceneTransition(new this._newScene, cc.TransitionCrossFade, 0.4);
			}, 0.5);
		}
    },
});

//Transition between two scenes.
function SceneTransition(desiredScene, transitionType, delay, load, oldScene)
{
	var nextScene = cc.Scene.create();
	var nextLayer = desiredScene;
	nextScene.addChild(nextLayer);
	if (load)
		cc.LoaderScene.preload(g_resources, function () {
			cc.Director.getInstance().replaceScene(transitionType.create(delay, nextScene))
        }, this);
	else
		cc.Director.getInstance().replaceScene(transitionType.create(delay, nextScene));
}

//Check if an entity has a point in it via a typical AABB check.
function entContains(ent, point, world)
{
	if (world)
	{	
		var point2 = ent.convertToWorldSpace(ent.getPosition())
		point2.y -= ent.getPosition().y;
		return (point.x >= point2.x && 
				point.x <= point2.x + ent.getTextureRect().width &&
				point.y >= point2.y &&
				point.y <= point2.y + ent.getTextureRect().height);			
	}
	else
		return (point.x >= ent.getPosition().x && 
				point.x <= ent.getPosition().x + ent.getTextureRect().width &&
				point.y >= ent.getPosition().y &&
				point.y <= ent.getPosition().y + ent.getTextureRect().height);
};

//Global geography variable.
var Geo = {};
var isLocalStorage = false;

//Checking whether the browser supports localStorage.
if (typeof(Storage) !== "undefined") 
	isLocalStorage = true;
else cc.log("Storage API not found. Game cannot be saved!");

//Utility functions for saving and retrieving data.
//Simple local saving of a variable.
function saveLocal(key, value) {
	if (isLocalStorage) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
}

//Retrieving of a locally stored variable. 
function getLocal(key, string) {
	if (isLocalStorage) {
		//If the value is intended to be a string, then return it as such, 
		//otherwise return the parsed object. Just for efficiency of code.
		if (string) {
			return window.localStorage.getItem(key);
		}
		else {  //Converting from string to data requires 2 parses. 
				//One to remove string formatting, other to turn into code.
			return JSON.parse(JSON.parse(window.localStorage.getItem(key)));
		}
	}
}

//Removing a locally stored value. Lots of safety checks.
function removeLocal(key) {
	if (isLocalStorage && key != null && typeof(key) == "string" && getLocal(key) !== undefined) {
		window.localStorage.removeItem(key)
	}
}