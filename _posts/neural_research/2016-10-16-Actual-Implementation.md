---
title: Actual Implementation...!
tags: post
category: neural_research
layout: post
comments: true
---

This week, I've pulled the lead out and finally done some actual work implementing the neural network within the engine itself. For my implementation, I've based my code heavily off Kenneth Stanley's C++ implementation of NEAT.

The implementation creates various classes to represent that various aspects of a neural network. To represent the elements of the network, there are numerous classes. The first class is the network class, which stores input and outputs and provides methods to modify connections between each. The second class is the genome, a container for all the data within the the neural node class, which marks the layers of the network. The link class, which connects neurons between layers. The innovation class, which stores data on modifications made to the network. The gene class, which stores genetic information, as well as traits. These traits are also contained in their own class, which stores an array of parameters which denote the functionality of the gene link. The traits in the NEAT example aren't actually used, however; they appear to be part of a feature that wasn't fully developed at the time. However, I've implemented my own version of them just to be safe. I can always take it out later!

The other aspect of neural networks treat them as objects. For that, there are a number of containers that are designed to perform operations on the network and its elements, whilst also collating data on the network. The organism class contains a link to a genome as well as a network, basically encompassing the evolutionary classes of the neural network. The species container groups organisms with similar genetic traits. The idea behind this is that, during evolution, these traits can be protected to allow for innovation to improve over time. Last, but certainly not least, exists the population class, which stores the global list of genomes, as well as species which have been generated off these genomes.

I've yet to finish the structure of the implementation; I should be done next week. We'll see how things go.

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Stanley, K.O. 2016, NEAT C++, Neural Networks Research Group, viewed 16/10/2016 <a href="http://nn.cs.utexas.edu/?neat-c">http://nn.cs.utexas.edu/?neat-c</a></li>
</ul>