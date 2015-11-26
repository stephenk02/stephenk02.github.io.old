---
title: New Map, Tiled and Slick
tags: post
category: EarthScape
layout: post
comments: true
permalink: blogs/earthscape/New-Map-Tiled-and-Slick
---

Starting today our artist finished the tileset for our cave environments within the game. As such today was spent incorporating this in a decent way within the game. This involved making a layer system for drawing the map, as well as messing with the Tiled importing code we found on the web to support importing objects placed in the Tiled program. The layer system was required due to the 45 degree bird's eye perspective the game is set from, so the player would need to be obscured by walls and columns, at certain positions.

Tiled supports layers in its tile creation and the importer originally did not allow drawing each layer separately. It did, however, store each layer in its own index in a list, so I added a function to specify which layer index to draw within a function. That worked well enough, but a strange bug ensued where tiles would be garbled regardless of drawing order. This problem was resolved by ending and restarting the spritebatch after drawing each layer. I'm not too sure why it is, but the problem is solved :).

A quick demonstration of the game in it's current form can be seen below. WARNING: It looks pretty damn good. 

![Picture demonstrating slick new tileset]({{ site.baseurl }}/images/earthscape/2.png "Newly tiled map looks very nice!")	