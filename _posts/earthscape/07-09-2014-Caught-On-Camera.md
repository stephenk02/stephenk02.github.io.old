---
title: Caught On Camera
tags: post
category: earthscape
layout: post
comments: true
permalink: blogs/earthscape/Caught-On-Camera
---

Seeing as yesterday was resolution day, today is camera day. Boy was today a tough one.

When creating the resolution, recall that the goal was to basically create a scale matrix which could transform the sprite batch's drawn objects to the correct scale. Well, with the camera it requires a translation, rotation and scale matrix. However the maths with the camera means that these are just user defined values, so they can be created simply by passing in, for example, a rotational value into Matrix.CreationRotationZ(). This would create a rotation matrix for multiplication with the other matrices.

Whilst we're on the concept of multiplication of matrices, I found that the translation matrices for the camera need to be multiplied by the ratio of the virtual resolution to the window resolution. This is because otherwise the translation for the camera will be done as though the game is being rendered at the same resolution as the window. This would mean that the camera would be between the world origin and the player in most instances.

After the camera's matrix has been successfully retrieved, the camera matrix should be multiplied with the resolution matrix to give a fully dynamically moving camera within the world! Or to be more precise, a moving world with a static camera! :^0

Another feature of my camera is that it 'tweens' to the spot it should be aimed at, called the focus. It's position is tweened each frame towards the focus, creating a nice dynamic feeling camera. To further take advantage of this, I added a focus entity value to the camera, allowing the camera to 'lock on' to any object that inherits from the base entity class. If this focus entity is not defined, the camera goes into free roam mode, a feature which we could take advantage of. 

That was about it for today, I spent a lot of time making cameras work and look cool!