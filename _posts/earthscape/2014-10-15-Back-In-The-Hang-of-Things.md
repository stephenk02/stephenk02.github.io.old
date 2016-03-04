---
title: Back In The Hang of Things
tags: post
category: earthscape
layout: post
comments: true
---

Today I had to get back into the hang of things, as the title says. It was our return to programming and was also a little hectic as the team was fragmented between classes, so communication had to be done via SMS. We we given the final spritesheet for our player as well as enemies, courtesy of our artist, which another team member immediately began to implement. 

I also began work on a minimap feature for the game. For this I analyse each tile in the map on game load, checking for the tile IDs which correspond with ground tiles. For each ground tile I create an instance of the Tile class, which stores a rectangle with the tile's position and size, and a 'discovered' bool. I assign this Tile to a dictionary with the Global map ID of the tile as it's key, this ID is unique and represents the slot which the tile occupies on the map. Each tile's ID can be used to find its position on the map, as the map operates on a grid. 

I use this to create a small representation of the map within a new viewport which I place at the top right of the screen. As each tile defaults to undiscovered, none are drawn by default. However, when the tiles are translated close enough to the player, they are set to discovered and subsequently rendered to the screen. This allows for a dynamically discoverable map to be placed in the game. The final result can be seen in the screenshot below, as well as the final sprites of the player and enemy.

![Minimap and enemies!]({{ site.baseurl }}/images/earthscape/3.png "Minimap and enemies!")	