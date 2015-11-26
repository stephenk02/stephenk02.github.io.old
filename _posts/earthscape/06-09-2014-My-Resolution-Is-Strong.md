---
title: My Resolution Is Strong
tags: post
category: Earthscape
layout: post
comments: true
permalink: blogs/earthscape/My-Resolution-Is-Strong
---

Our second week on the project and things are still going well. We had a SCRUM meeting to kick things off and everyone seems to understand what's required of them. I asked around the group and no one had any issues either, so things are off to a good start.

My tasks for this week are to get the Camera and Resolution working within the game engine. Judging by how the camera is more an internal thing and the resolution an external one, I chose to begin with resolution today, as it would be more important to have fully implemented sooner.

For our game, we wanted to implement virtual resolution. This is where the rendered resolution differs from the window resolution. To do this I needed to setup a resolution class that would take in the window resolution, virtual resolution and create a matrix transform to, well, transform everything that the spritebatch draws.

The resolution was a fairly complex thing to get access to; there are numerous functions and properties relating to screen size, but I found that using the graphics.PreferredBackBufferWidth property to work well with what I needed. Setting this allows the window size to change, allowing the changing of resolution. The Vita uses a resolution of 960x544, so I set that as the default resolution.

After this the transformation matrix can be calculated by calling Matrix.CreateScale, with the width and height of the window divided by the virtual resolutions as parameters. This will return the correct matrix scale required for the virtual resolution. This scale matrix can then be passed into the spritebatch.Draw function to modify it's drawing. It's a fairly convoluted process, but it's easier to understand once you actually do it, I guess.