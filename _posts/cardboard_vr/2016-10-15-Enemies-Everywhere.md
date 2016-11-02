---
title: Enemies Everywhere
tags: post
category: cardboard_vr
layout: post
comments: true
---

Another week another fifty bugs to fix. This week I've spent some time fixing a couple of silly bugs that came up during last weeks development on events. On top of that, I've started work on the enemy subclasses. I've implemented both a wall turret and a grounded turret to start off, and I'll be implementing moving tanks once the level design is finalised. Both these enemies simply track the players current position, firing at random intervals.

Moving AI tanks will need to wait until level design is finalised because they will navigate via navmesh. I'd like the geometry layout to be finalised before I sit around waiting for navmeshes to compile as well as tweaking them...