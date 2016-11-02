---
title: Neural Design
tags: post
category: neural_research
layout: post
comments: true
---

This week, I've been putting more thought towards how I should process data in my neural network. The general topology of the network will include an input layer, an output layer and an evolving hidden layer topology determined at runtime. But how will all of these layers work? What will they be made of?

<h4>The Input Layer</h4>
The input layer of neural network is how it 'sees' the world. How it responds to stimuli depends entirely what it can see, so the system should try and represent the world in as meaningful a way as possible. But how can we represent this layer in a 3D FPS game? Similar examples of neural networks in games have been either been designed in 2D game environments or, if in 3D, the can be broken down into a somewhat 2D plane of information. What exactly do I mean by that? Well, look at the image below.

<img src="{{site.baseurl}}/images/neural_research/input_layer_example.png" alt="Examples of input layers, MarI/O on the left, Driver Simulation on the right." class="img-responsive post-image"/>
<p class="post-image-caption">Examples of problem spaces in neural networked games, and how their inputs are represented.<sup><a href="#s1"></a><a href="#s2"></a></sup></p>

For SethBling's MarI/O, how the problem space is represented in two dimensions for input is fairly obvious; the neural network simply reads position data of the environment and any entities in it and represents them in a grid plane. But what about the driving simulation? How is that 2D? Well the problem space to be solved is to avoid wall collisions; the car only needs to know what's in a flat cone of vision around it. How can we adapt this concept from these two-dimensional environments to a three-dimensional first person environment, whilst still implementing valuable sensory data?

Well, why does it have to be 3D? I mean, the game is 3D, sure, but why can't we break down what the player is seeing into a flat representation? Through use of trace lines from the player's point of view, this could be possible. The graphic below demonstrates what I mean.

<img src="{{site.baseurl}}/images/neural_research/quake_input_proposal_v1.png" alt="Demonstration of potential Input layer in Quake." class="img-responsive post-image"/>
<p class="post-image-caption">A grid of input neurons for Quake, overlaid onto a scene within the game.</p>

The grid overlaid on the image above is how I think the neural input should be represented in the game. The color of the box represents what the trace has 'seen', with red being an enemy, white being walls, blue being ground and orange being the ceiling. The red dot represents the point that the trace samples. With the use of tracing lines, each neuron in the grid can receive information on what is in the direct centre of it. The large size of each neuron could lead to some minor inaccuracies but this could be adjusted by increasing the 'resolution' of the grid. Ultimately this will allow the AI to receive information on what is in the scene, from walls to enemies to pickup items.

This trace method may not be the most efficient thing in the world, but there could be ways of making it more efficient than otherwise. Firstly, outer traces could be done less frequently than inner traces, traces could be updated on alternating frames, maybe outer neurons could even be made to 2x2 the size of inner neurons. This kind of thing will take some experimentation during implementation, but what doesn't in neural networking? :)

A quick thought about storing information about walls: would it just be better to store a value that would show the basic angle of the wall, and let the network figure out that it can walk on certain 'walls'. I think a good way of doing this would be to store the dot product of the collision normal of each wall, which would track its angle in a way that could easily be normalized. 

<h4>The Output Layer</h4>
Output is not as complicated, but it needs to be detailed at the very least. Once again referring to MarI/O, a game output layer usually contains the controller input that the console can accept. The keyboard is fine to represent, because it's just some buttons, but how should the mouse view be represented? I think that the best way to feed input through the mouse would be to simply feed a positive or negative value for the x / y axis view movement, ignoring the angle that the player is currently facing and only looking to modify it to see a result. The network should be able to track how feeding each input modifies the sensory data.

In any case, this will all take some experimentation to lock down. Hopefully we can see how it looks in the weeks to come!

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">SethBling, 2015. MarI/O - Machine Learning for Video Games. YouTube, viewed 10/10/2016, available at: <a href="https://www.youtube.com/watch?v=qv6UVOQ0F44">https://www.youtube.com/watch?v=qv6UVOQ0F44</a></li>
  <li id="s2">Nikita Markianov, 2015. Virtual autopilot (Unity3D, Neural Network, JavaScript). YouTube, viewed 10/10/2016, available at: <a href="https://www.youtube.com/watch?v=2hVnAYzPBEM">https://www.youtube.com/watch?v=2hVnAYzPBEM</a></li>
</ul>