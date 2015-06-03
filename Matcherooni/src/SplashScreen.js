var SplashScreen = LayerExt.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    ctor:function () {
        this._super();
		
        var size = cc.Director.getInstance().getWinSize();
		
        this.helloLabel = cc.LabelTTF.create("Matcherooni", "Impact", 108);
        this.helloLabel.setPosition(size.width / 2, size.height - size.height / 14);
        this.addChild(this.helloLabel);

        // add "Helloworld" splash screen"
        this.sprite = cc.Sprite.create(s_SplashScreen);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.sprite.setScale(size.height/this.sprite.getContentSize().height);
        this.addChild(this.sprite, -1);
	
		this._worker = new Worker("src/Worker.js");
		this._worker.addEventListener("message", this.onMessage.bind(this), false)
		this._worker.onerror = function(error) {
			throw error;
		};
		
		//Determining the geographical location of the user. 
		//Only needs to be done at run-time for obvious reasons.
		if (navigator.geolocation) {
			//getCurrentPosition takes a success callback and a failure callback.
			navigator.geolocation.getCurrentPosition( function(position) { //success.
					Geo = position;
				}, 
				function() {
					console.log("Error locating user!"); //failure.
				},
				{timeout:1000} //enforce a timeout so 
			); 
			//Post the postions to the worker. This is the only way to get the info into
			//the worker, as navigator will not work if not run on the main thread.
			//There is also some delay before the position is ascertained, therefore scheduleOnce.
			this.scheduleOnce( function() {
				if (Geo.coords != null && Geo.coords.latitude != null && Geo.coords.longitude != null) {
					this._worker.postMessage({lat:Geo.coords.latitude, lon:Geo.coords.longitude});
				}
			}, 1);
		}
		else {
			console.log('Geolocation is not supported');
		}
		
		this.scheduleOnce( function() {
			this.startLoading(MainMenu, g_menu, "", true);
		}, 1);
    },
	
	onMessage:function(event)
	{
		Geo = event.data;
		//Create temp 
		Geo.main.tempC = Math.round(Geo.main.temp - 273.15)
	},
});

var myScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SplashScreen();
        this.addChild(layer);
        layer.init();
    }
});