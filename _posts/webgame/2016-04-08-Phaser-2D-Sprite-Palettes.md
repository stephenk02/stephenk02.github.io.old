---
title: Phaser 2D Sprite Palettes
tags: post
category: webgame
layout: post
comments: true
---

For my webgame project I've settled on using the JavaScript HTML5 game engine known as Phaser for rendering most of the clientside data. This particular engine supports a slew of features geared towards 2D game development, so I think it's an ideal backbone for the game. One of the features I wanted for my game was the ability to change your character's color palette, in order to customise the character. Unfortunately it seemed like Phaser didn't have any easy method of doing such a thing, but I found a way. Using some of Phaser's rendering libraries I could swap each color in a texture one by one until the entire texture's colors had been changed.

For my game I've also decided to lift sprites from the 2D fighter Melty Blood, because this is a student project and I don't really care if I have to take it down because of legal reasons (gulp). Unfortunately the palette data for the sprites in that game is in the .PAL format, a microsoft made format which stores the RGBA data of a sprite in an ordered chunk of variable length. Using information provided by Will Perone at <a href="http://www.willperone.net/Code/codereadingpal.php">this webpage,</a> I was able to write a JSON builder in C++ to interpret these .PAL files and compile them into the .JSON format. An example of an output of this builder can be seen <a href="{{ site.baseurl }}/docs/palettes.json">here</a>. 

Because Phaser natively supports JSON files and loading them in to the clientside from the server, I began to write code which interpretted this data and swapped the palettes of a sprite in the Phaser engine. This is done via Phaser's BitmapData object, an object which gives access to an empty data canvas which can load images and subsequently edit them. The results of my code are below.

{% highlight js linenos=table %}
create: function () {
	this.sprite = game.add.sprite(game.scale.width / 2,game.scale.height / 2,'hisui');
	this.sprite.anchor.set(0.5);

	this.sprite.animations.add('idle', null, 20, true);
	this.sprite.animations.play('idle');

	this.sprite.currPalette = 0;
	this.sprite.paletteData = game.cache.getJSON('hisui-palettes');
	this.sprite.atlasData = game.cache.getJSON('hisui-atlas');
},
	
loadpalette: function(sprite, baseTexture, number) {
	// Select a number within our range of palettes, if argument defined.
	if (number !== undefined) { 
		sprite.currPalette = game.math.clamp(number, 0, sprite.paletteData.length-1); 
	}		

	// Create array to store the texture data of our palettes.
	if (!sprite.loadedPalettes) { sprite.loadedPalettes = []; }

	if (sprite.loadedPalettes[sprite.currPalette] === undefined) {
		//Create a new bitmapdata object to store the sprite palette. 
		//Each palette requires its own bitmapdata, as each represents a new texture.
		sprite.loadedPalettes[sprite.currPalette] = game.make.bitmapData();
		var bmd = sprite.loadedPalettes[sprite.currPalette];
		bmd.load(baseTexture); 

		//If we want the default palette, we shouldn't try to replace anything!
		if (sprite.currPalette != 0) {
			//Optimisation of replaceRGB function call to ignore duplicate color values.
			if (!sprite.nonDupes) { 
				sprite.nonDupes = []; 
				for (var i = sprite.paletteData[0].length; i--;) {
					var joined = sprite.paletteData[0][i].join();
					if (sprite.nonDupes.indexOf(joined) <= -1) {
						sprite.nonDupes[i] = joined;
					}
				}
			}
			var defRGB = sprite.paletteData[0];
			var newRGB = sprite.paletteData[sprite.currPalette];
			// Loop through all palette data and replace each color one by one.
			for (var slot in sprite.nonDupes) {				
				bmd.replaceRGB(defRGB[slot][0],defRGB[slot][1],defRGB[slot][2],255,
							   newRGB[slot][0],newRGB[slot][1],newRGB[slot][2],255);
			}
		}
		//Store bitmap data and animation data on the game cache, for instant re-access.
		game.cache.addTextureAtlas(baseTexture+sprite.currPalette, null, bmd.canvas, sprite.atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	}
	sprite.loadTexture(baseTexture+sprite.currPalette, this.sprite.animations.currentAnim.currentFrame.index, false);
}
{% endhighlight %}
<p class="post-image-caption">JavaScript code to replace the pixels in a Phaser BitmapData object.</p>

This code creates a BitmapData object, applies the character spritesheet to it, and then loops through the supplied JSON, replacing the RGB value of each pixel with a new one. Because the game can use BitmapData to store textures, these created bitmaps can be reused whenever the player wants to swap back to a particular color, without having to rebuild the palette texture. The only downside to this is that as the spritesheet size scales up, so too does the amount of memory each version of a spritesheet takes up. The spritesheet that applies this technique is 12KB large, containing a single animation. If this technique were to be applied to multiple spritesheets with a large amount of animations, storage requirements may quickly get out of hand.

<img src="{{site.baseurl}}/images/webgame/palette_swap_example.png" alt="Example of palette swap technique, demonstrating a character with red hair and black dress changing into one with brown hair and green dress." class="img-responsive post-image"/>
<p class="post-image-caption">An example of a palette swapped character. The left is the default.</p>

Colors can be swapped out at any time with this method, at the cost of a small amount of processing time. This, however, is not an issue, as this code only needs to run on menus during selection and a single time during the game to initialise the palette onto the spritesheet. If implementation required instant access to different colors of a sprite for a certain event, say an explosion lighting up a wall, it would be better to provide to pre-made textures with both the color prior to the event and a color after the event.

For my game, I plan to disallow palette swapping during the game. Players can only pick their color on the character menu, where the only animations required would be an idle one and a "I've been selected" animation. This means I can make a smaller spritesheet for the menu and a larger complete spritesheet for the game, and only build the color I need for use within the game.