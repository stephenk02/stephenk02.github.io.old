---
title: Controls and Inheritance
tags: post
category: cardboard_vr
layout: post
comments: true
---

This week I've focused on finalizing player control systems as well as implementing an inheritance scheme throughout the project.

The last improvements to the players controls have been geared towards smoothing out the experience for VR headsets. Aiming has been modified so that the turret will fire bullets directly towards the exact point a player is looking at. Prior to this implementation, the turret was simply mimicking the pitch of the headset, which meant that bullets would usually hit somewhere slightly below the target. Because precision aiming is such a key part of the game, this has been changed. A raycast is used to determine the closest point which the player should hit. The other change to player controls was to add a slight acceleration and deceleration to the movement of the tank. this in turn would lessen the disorientation a player could get whilst controlling the tank.

As the functionality of the player has been done to a fairly complete degree, I've also begun implementing an inheritance scheme all objects will adhere to. The goal of this, as in any inheritance scheme, is to design both shared and polymorphic functions in order to call functions within gameobjects efficiently. An incomplete UML diagram representing the various classes to be included in the project is shown below.

<img style="background: #FFF; background-image: url('{{site.baseurl}}/images/cardboard_vr/grid.png'); border-radius: 4px;" src="{{site.baseurl}}/images/cardboard_vr/class_diagram.png"/>
<p class="post-image-caption">Class diagram representing the inheritance scheme of the project.</p>

All GUI based classes will be seperated into an entirely seperate part of the library, with them deviating directly off of the MonoBehaviour object. The entity class will define the most basic aspects of any entity that exists directly within the game world. Two classes will branch off of this Entity class, these being Sentient and Interactive. The sentient class will be the template for the Player as well as any AI driven entities, whilst the interactive class will be the template any object that the player can interact with; doors, buttons and other objects.

The goal of this inheritance is to allow more control over each in-game object with Unity's helper functions. If we can seperate each by its components, we can differentiate the in-game objects whilst also allowing them to share similar functionalities. All in all, it's a fairly good practice that will save me some time. 

Next week I'll be taking a planned break from software development, so unfortunately there will not be any progress updates :(. 