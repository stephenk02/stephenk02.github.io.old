---
title: Squeaky Clean Code
tags: post
category: EarthScape
layout: post
comments: true
permalink: blogs/earthscape/Squeaky-Clean-Code
---

Today we went ahead and flushed out all of that icky redundant and unused code, as well as all the commented out code. This helped us space out the project a little easier and in doing so we noticed a few bugs that were keeping the Vita version's frame rate down significantly. 

These involved multiple loops through the same entities within the entity manager. This was redundant as code running in the second loop could've just been run in the first and yet there it was, in a second loop, killing the cross platform dream. 

There was also a problem causing the enemy grunts not to be updated properly. This was because the nerd who coded it failed to properly virtualize the base entity function down to the grunt. Obviously none of this stuff was my fault :^). In any case more minor bug fixes and such as well... Things are lookin' good for our 'release' tomorrow.