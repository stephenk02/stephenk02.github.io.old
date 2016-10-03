---
title: The Development Environment
tags: post
category: neural_research
layout: post
comments: true
---

Goodness, me! As it turns out, setting up a development environment for a... 20(?) year old game is not as easy as it sounds. The use of obsolete language features in native C, as well as actual machine language, make it less than ideal. Because of the near-impossibility of using the original Quake source code as it was, I've decided to make use of one of the many existing modernised versions of it. Selecting one was quite difficult, as they either had a number of bugs, or the source code was unavailable, but I finally settled on using a modified version of the FitzQuake Mark V Quake engine, as it supports DX8 rendering on top of both OpenGL and basic software rendering. 

Despite this, some refactoring was still necessary (despite the code having gone through at least four different people!), as I wanted the project ported from Visual Studio 2006 to a more modern version of the Studio. I've chosen 2013 for this project, however at this point I'd say that having ported it to 2013 the project will be able to run for the forseeable future on newer versions of Visual Studio. That said, I've had a look at the various aspects of the engine and added a couple of my own features to test out it's functionality. Of note is an orthogonal view toggle, a simple feature I did to test my ability to modify the rendering pipeline of the engine. I've included a visual of it because why not?

Next week I'll be unable to post any meaningful updates, as I'll be taking a break, but my next goal for Quake is to begin implementing custom code within the project. I'm a little hesitant to mess with such a good game, but you gotta break a few eggs to make an omelette, or whatever little Lisa Simpson said that one time. 

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Func_Msgboard. Fitzquake Mark V, available at: <a href="http://celephais.net/board/view_thread.php?id=60831&start=1203">http://celephais.net/board/view_thread.php?id=60831&start=1203</a></li>
</ul>