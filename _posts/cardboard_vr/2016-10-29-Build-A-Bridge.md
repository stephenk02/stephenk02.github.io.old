---
title: Build a Bridge
tags: post
category: cardboard_vr
layout: post
comments: true
---

In order to satisfy various level design requirements, this week I've gone about implementing doors, bridges and buttons. Basically any manner of object that will move during the course of gameplay due to interaction with another object. These objects build upon my previously mentioned event system, and broadcast events to a list of subscriber objects that are stored within the entity. Whenever a door or button is triggered it calls its own trigger function, which would be to open and to press down, respectively. However, the event is also broadcast to subscribers, so it gives the illusion of applying an effect within the world, when theres basically just a link between two objects.

Ultimately this functionality will allow me to implement things like doors that must have buttons shot in order to be opened, as well as groups of enemies that must be cleared in order to progress. So that's pretty good, right? Next week I'll be implementing prototype menus to navigate in order to start and exit the level. The menus will give the game a bit more flair and will also pose an interesting challenge, considering the design considerations that must be taken into account with Cardboard.