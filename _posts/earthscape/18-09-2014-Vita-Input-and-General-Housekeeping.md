---
title: Vita Input and General Housekeeping
tags: post
category: earthscape
layout: post
comments: true
permalink: blogs/earthscape/Vita-Input-and-General-Housekeeping
---

Today we were finally given a chance to run our games on the Vita platform, and as such I tested yesterdays input and it worked fairly well! I was stunned because things usually go horribly wrong. In any case, everything else didn't go well, the game crashed at the sprite draw, with a fairly uninformative error message. Upon stopping the map tiles from drawing, however, the game ran just fine. 


So it turns out the amount of map tiles being drawn in-game resulted in the memory of the spritebatch draw exceeding its limits. So, I had to optimise the drawing functionality, drawing rectangles only when they were inside a screen-sized box which attached itself to the camera.

I also made sure my buttons worked, and implemented a test button to check. It functioned perfectly. Aside from this a minor improvement with the input was made, allowing right analogue stick control over the camera. Not much else to say about today, a good chunk of it was spent setting up the vita and fixing the drawing error.