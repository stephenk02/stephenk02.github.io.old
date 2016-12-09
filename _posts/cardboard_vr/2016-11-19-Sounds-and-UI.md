---
title: Sounds and UI
tags: post
category: cardboard_vr
layout: post
comments: true
---

During this week, I spent some time polishing the game's overall presentation. This included implementing a UI for the tank, as well as sounds for every object in the game.

The UI was fairly easy to implement, although the experimentation done in order to implement it was not. The UI as it is right now is just a panel attached to the top of the tank, which displays in world space. This design was chosen because it is both immersive and highly readable for players using the Cardboard interface. The experimentation done on the UI, however, did take some time to reach this final design. This was mainly due to adjustments I made for the camera when it was facing down on the tank. I made the camera freeze in position and zoom in on the menu in earlier tests, but this proved to be a bit unwieldy and disorienting, so I scrapped the feature. It did take a bit of time to implement, so that was unfortunate.

As for the sounds, they were a bit more straight forward, but the man hours were quite a bit higher. First I had to find royalty free sounds made available on public domains and splice them up to fit the design of the game. The most difficult sound I had to do was that for the minigun. Thankfully there was a full soundclip online of a minigun winding up, firing and then spinning down. I seperated the sound into these three sections and had each play based on the current state of the minigun. It works nicely in the final build; I'm pretty proud of it because it worked out so well so easily. What's worth noting about the sounds in the engine is that they use an audio spatializer made specifically for Cardboard;  Unity's default Audio Source implementation does not work. Instead, developers are required to use a GvrAudioSource script, which functions pretty much identically, with some features removed. It's not exactly a big deal but it's still worth noting.

This was pretty much the last feature-driven update week for my project. Next week will be focused heavily on polishing the various elements of my game and bringing them up to a presentable standard. Time to roll up the sleeves one last time...!