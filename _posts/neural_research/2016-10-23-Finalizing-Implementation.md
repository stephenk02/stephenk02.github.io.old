---
title: Finalizing Implementation
tags: post
category: neural_research
layout: post
comments: true
---

Ok, I've had my head down this week working hard to get the implementation finished, and I'm please to report it was successful; the neural network should work in Quake.

The keyword here is should, because I haven't had the chance to get it working in-engine. :/ . I've made a defined some function links between Quake and the network C code which will allow me to interact between the engine and the network, but this has yet to be fleshed out into any real variable interaction and initialisation. I have worked out that for my network to work, I'll need to interface between the engine and the network on three occasions. These are:

1) Reading inputs from the engine. Whenever the engine updates all objects on the serverside, SV_NeuralThink is called, which in turn will signal to the network to start analysing the current world space for data. This will be done by tracing, as cited in my previous blog post on 'Neural Design'.

2) Passing neural network outputs back into to the engine as key inputs. Right before the engine parses all commands and inputs sent from the client, the network is allowed to call engine inputs in order to control the player.

3) Drawing debug displays. This particular step is not entirely necessary, but at the same time it completely is. During the drawing phase of the game, The neural network is allowed to draw debug elements in both 3D and 2D space. The 3D elements are drawn under the HUD so they are called just before the HUD is drawn, whilst the 2D elements are drawn after the HUD is drawn. The debug drawing is necessary in order to gauge inputs, monitor the current values of the neural networks and determine where any issues are occurring.

Over the weeks to come I'll be implementing the functionality required in each of these functions, probably starting with both the debug and input functions.