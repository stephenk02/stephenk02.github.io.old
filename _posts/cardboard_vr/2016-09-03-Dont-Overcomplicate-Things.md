---
title: Don't Overcomplicate Things
tags: post
category: cardboard_vr
layout: post
comments: true
---

Okay, last week I spent my time on WheelColliders. That was a mistake. Since then I've gotten rid of wheels and am instead opting for movement via the MoveRotation and MovePosition functions, which give absolute movement. This absolute movement is much better because it gives the player more control, something which is always good. 

Unfortunately the MovePosition function does not apply velocity during its movement. Why is this a problem? Running the tank off an edge causes it to freeze the moment it leaves the ground. The solution I've found? Track the player's 'grounded' state. If they leave the ground, apply a velocity and rotation based on their current movement, and disallow them from changing this mid-air. This was a decent solution and did work, until I rubbed up against a wall and climbed it! 

Ladies and gentlemen, always ensure you check the collision normals and ensure you can't climb walls of a certain angle, via use of dot product. I've made it so the tank will not be able to move up any walls greater than 45 degrees.