---
title: Play-Testing Day 2.0
tags: post
category: earthscape
layout: post
comments: true
permalink: blogs/earthscape/Play-Testing-Day-2_0
---

Today marks the end of week 3 of gameplay development. Half of today was reserved for play-testing again, this time in a more public environment, something a bit more valuable than playtesting between developer teams. However, for the first half of the day I was developing an inventory system.

The system is a map of items, linked by an item class, and the amount of that class. An ID number is also required to be able to fully identify what type of item is in a particular spot. The player can sort items, stack them up to an amount defined by the item itself, or remove them from the inventory. The inventory also removes other items if the specified amount is greater than the stack and there are other items of that ID in the inventory. 

I also spent a bit of time refining the game state machine developed by another member of the team, so now most of our gameplay code is contained within a specific gameplay state .cs file. Things are a lot neater now.