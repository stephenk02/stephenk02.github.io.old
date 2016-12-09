---
title: Turrets and Castles
tags: post
category: cardboard_vr
layout: post
comments: true
---

Hey, look, more posts about that stuff I've already done! Yes, well, I wouldn't be working on it if it didn't need work :(.

This week I spent time setting up the castle to be converted into a model, whilst also developing more intricate AI for the turrets in the game. 

In order to convert the castle into a model, I've exported all the gameobjects that make it up to a .obj file, via a Unity asset plugin. This obj file will then be systematically remedied by my artist to form the castle.

For the turrets, I've implemented various types based on what my artist has created. There is a minigun turret, which will fire hitscan bullets, a rocket turret, which will fire exploding missiles, and a cannon turret, which will fire rigidbody spheres. Obviously this took a bit of fiddling with the code, so now that it's in there I'm pretty pleased. Basically this adds more variety to the game, so I think it's a nice addition. It also means I can balance certain areas of the game to be a bit more challenging than others, as the minigun is probably the strongest enemy turret, due to the difficulty of dodging its bullets.

Ultimately it gives me more power in making the level, so it's a super good addtion!