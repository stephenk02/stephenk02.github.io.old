---
title: UIs and Play-Testing
tags: post
category: earthscape
layout: post
comments: true
---

So today I finished up the camera for the game. It can now focus on any entity within the game, storing a reference to the entity and getting it's position when calculating the focal point. I also added controls, allowing the player to offset the camera in any of 8 directions (something I hope to expand into an omni-directional look via the PS Vita thumb sticks).

I also began the basic button and window frame classes. I started with a new base frame class, which doesn't inherit from the base entity class. This is because the base entity class is focused on creation of game objects, whereas I would like to go for a focus on GUI elements. 

Something important to note about the UI objects is that when I draw them, I only use the resolution transform matrix, and not the camera matrix, this is to give them a static position on screen, rather than moving with the world itself.

Aside from this it was play-test day and, needless to say, we were all rather agitated bringing our game up to a playable state. Most of the day was spent ironing out bugs, as mentioned I fixed my camera code, and the others were working on fixing collision and implementing it properly.

Unfortunately our game was a mess when the time came around. It compiled sure, but it wasn't particularly stellar. With about two weeks worth of development though, I'd say this was no failure. A playable game is as good as it should get. A quick screen capture of what the early alpha build has to offer can be seen below.

![Early earthscape alpha build]({{ site.baseurl }}/images/earthscape/1.png "Early earthscape alpha build")	

The player can walk around, shift the camera in 8 directions and kill the clone. There's not too much going on here but there's enough behind the scenes to justify it's current state, or lack thereof, gameplay-wise.

After the play testing had past, I focused my efforts on finishing the UI, and got dialogue boxes with scrolling text working. I did this by converting the dialogue string to a char array, then pushing it character-by-character onto the drawn text string, with a small delay between each. This was  simple and effective implementation and functions really well, so I'm fairly proud of it.