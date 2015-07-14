Geo={};

self.addEventListener('message', function(e) {
	if (e.data.lat)
	{
		Geo.lat = e.data.lat;
		Geo.lon = e.data.lon;
	}
	if (Geo.lat != null)
	{
		var result = load ( "http://api.openweathermap.org/data/2.5/weather?lat=" + Geo.lat + "&lon=" + Geo.lon,
		function(xhr) { 
				parsedResult = JSON.parse(xhr.responseText);
				self.postMessage(parsedResult);
			}
		);
	}
}, false);

// simple XHR request in pure JavaScript
// from: http://techslides.com/html5-web-workers-for-ajax-requests/
function load(url, callback) {
	var xhr;
	if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0", 
				"MSXML2.XmlHttp.4.0",
				"MSXML2.XmlHttp.3.0", 
				"MSXML2.XmlHttp.2.0",
				"Microsoft.XmlHttp"]
		for(var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
			catch(e){}
		} 
	}
	xhr.open('GET', url, true);
	xhr.send('');
	xhr.onreadystatechange = ensureReadiness;
	function ensureReadiness() {
		if(xhr.readyState < 4) {
			return;
		}
		if(xhr.status !== 200) {
			return;
		}
		// all is well	
		if(xhr.readyState === 4 && callback != null) {
			callback(xhr);
		}			
	}
}