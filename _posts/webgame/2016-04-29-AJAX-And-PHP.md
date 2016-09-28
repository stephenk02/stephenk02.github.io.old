---
title: AJAX and PHP
tags: post
category: webgame
layout: post
comments: true
---

 For my web game, a constant communication between client and server is imperative. There are multiple different ways to accommodate such a communication way, and none of them are really conventional, due to the fact that a HTTP server will not know about its clients. The server will simply receive a request, and respond with information when appropriate. 

 As a result, the two methods most employed by websites, AJAX and WebSockets, rely on clients consistently pinging the server for information at intervals. AJAX requires manual pinging for data, whereas a WebSockets connection easier due to it maintaining a TCP connection. For my project, whilst a WebSockets connection would be easier, due to the difficulty of implementing WebSockets with a PHP backend, it is unfortunately not the ideal solution. WebSockets is built as an entirely seperate protocol from HTTP, which PHP is built on, whereas AJAX runs via HTTP JavaScript, so AJAX is more compatible. I doubt I would consider WebSockets regardless, as because my game is a turn-based one, it would be more appropriate to manually send data to the server when a player makes their turn, rather than maintain that connection that WebSockets does. A small ping every second to see whether another player has made their turn also seems more efficient.

<h4>So, what is AJAX, and how do we implement it?</h4>
AJAX, which stands for asynchronous JavaScript and XML, is a web development technique which allows for posting HTTP requests to a server from within a webpage, and receiving this data back from the server while still on a webpage. With proper scripting, this could allow a webpage to be updated in real-time, with it being entirely reloaded. The most common example of AJAX in application is the google search bar, which adds suggestions below an entered field using AJAX requests to a Google server. Google has actually developed a JavaScript library known as JQuery to ease the process of implementing it into JavaScript code. My project uses JQuery to perform AJAX functions.

{% highlight js linenos=table %}
//JavaScript function that sends an AJAX request for the chat to the server, using JQuery.
chat_update: function() {
	$.get({
		url: window.location+'/chat',
		data: {latest_chat : this.latest_chat},
		context: this,
		success: function(data) {
			for (var msg in data) {
				//PSEUDO-CODE: Process data into the chat
			}
    	}
	});
}
{% endhighlight %}
<p class="post-image-caption">JavaScript function that dispatches a get request for the chat, via AJAX JQuery library.</p>

For Laravel, my PHP Framework, in order to accommodate these HTTP requests, I've made seperate routes which provide a seperate response based on the request URL of a client. This is as simple as registering multiple routes with a different controller response. This means that I can AJAX request to a different URL, allowing me to run different internal code for different URLs from a single webpage. Below is an example of registering multiple routes to different URLs.

{% highlight php linenos=table %}
<?php
Route::group(['prefix' => 'game/'], function() {
    Route::get('/', 'GamesController@index');
    Route::post('/', 'GamesController@create');

    Route::group(['prefix' => '{url}/'], function() {
        Route::get('/', 'GamesController@show');

        Route::get('update/', 'GamesController@getUpdate');
        Route::post('update/', 'GamesController@postUpdate');

        Route::get('chat/', 'GamesController@getChat');
        Route::post('chat/', 'GamesController@postChat');

        Route::get('roll/', 'GamesController@getRoll');
        Route::post('roll/', 'GamesController@postRoll');
    });
});
{% endhighlight %}
<p class="post-image-caption">Route definitions for requests in a game. {url} is passed to the functions as a variable.</p>

With this method, it is possible to access all relevant data for a game, as the {url} variable provides the game's unique identifier which can be searched for within the database. Users are stored in the game via their ID, so they can be traced. With this request structure I can get any relevant data and return it to the user in an array format for processing in the game.

Below is what I've done for processing a request to get recent chat messages. The 'latest_chat' variable stored in the request in this piece of code and the previous JavaScript example is a string defining the timestamp of the most recent message the chat currently already has in it. This is to stop the request returning messages the chat would have already received.

{% highlight php linenos=table %}
<?php
/**
 * Handle Chat Request.
 *
 * @return Response
 */
public function getChat(Request $request, $url) {
    //We can find the game the chat request was for via the url variable.
    $game = Game::where('url', '=', $url)->first();
    if ($game) {
        //Generate a list of all game chat instances after the latest chat the client has.
        $msgList = GameMessage::where( 'game_id', '=', $game->id )
                              ->where( 'created_at', '>', Carbon::parse(($request->input('latest_chat'))) )->get();
        //Checking if we actually got any results
        if ($msgList->count()) {
            $data = $msgList->toArray(); //Store database data as array.

            //Create user_data entry for storing extra user info, as messages only contain a user's id.
            $data['user_data'] = []; 

            //Store the data of each user featured in the found messages.
            foreach ($msgList as $num => $msgData) {
                if (!array_key_exists($msgData->user_id, $data['user_data'])) {
                    $data['user_data'][$msgData->user_id] = User::where('id', '=', $msgData->user_id)->first()->toArray();
                }
            }
            return $data;
        }
    }
}
{% endhighlight %}
<p class="post-image-caption">The PHP chat GET request route controller function.</p>

The data returned by this function can be processed into the chat element within the game, allowing chat messages to display. The AJAX GET request within the JavaScript is sent once every second; a ping to receive new chat info constantly, mimicking a stable connection.

<img src="{{site.baseurl}}/images/webgame/ajax_chat.png" alt="Example of palette swap technique, demonstrating a character with red hair and black dress changing into one with brown hair and green dress." class="img-responsive post-image"/>
<p class="post-image-caption">The final in-engine chat.</p>

So with this implementation of AJAX within Laravel, requests pushing and getting data can be done in order to receive core game data. With this we can facilitate the processes for a turn-based game within a PHP and JavaScript environment.