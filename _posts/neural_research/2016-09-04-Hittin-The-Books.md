---
title: Hittin' the Books
tags: post
category: neural_research
layout: post
comments: true
---


Since last week, I've had a chance to read up on the various papers on Neural Networking and I have to say, it's very interesting! The level of adherence to real biology within neural networks is very interesting. The most prominent 'framework' for neural implementations, NEAT, uses homology in order to determine similarites with genes, as well as various other biologically based evolution stuff.

I touched on NEAT, but basically, NEAT is the 'evolution' of TWEANN (Topology and Weight Evolving Artifical Neural Network), a neural network framework which contains neuron nodes holding various bits of data pertaining to what they will do. The neurons link together with weight values and constantly evolve these weights based on the success of following one action with another. I'm not explaining it too well, but this diagram from Stanley, K.O.'s paper on NEAT should clear it up.

<img src="{{site.baseurl}}/images/neural_research/phenotype.png" alt="Example of a Neural Network within TWEANN." class="img-responsive post-image"/>
<p class="post-image-caption">An example of a Neural Network within TWEANN. Notice the genetic data of each gene.</p>

So NEAT is fairly similar to TWEANN, with a couple of extra requirements. Because TWEANN's genetic data storage is problematic, according to Stanley, K.O., NEAT's introduced requirements provide a clean framework to identify genes with. The first problem is that genes require a method to distinguish evolutionary similarities, to allow effective crossover during evolution. This is solved by applying a genetic history to each gene which can be compared during evolution. The second issue is that evolutions branching into different solutions for the same problem will struggle to compete without some form of 'innovation protection'. NEAT does this through speciating; genes are seperated into species dependant on their means to the solution. The last issue is that of overcomplex initial topologies, which NEAT deems too complex to provide an efficient evolution. Projects should start from a blank slate.

Whilst I'm still reading up on the various aspects of NEAT, I'm a little worried; I don't really know how I'd go about implementing it in code. There are various software libraries available that I could crack open to see the functionality of, if needs be, but I'd like to do an implementation on my own. We'll see about all this in the future...

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Stanley, K.O. and Miikkulainen, R., 2002. Evolving neural networks through augmenting topologies. Evolutionary computation, 10(2), pp.99-127., available at: <a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.28.5457&rep=rep1&type=pdf">http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.28.5457&rep=rep1&type=pdf</a></li>
</ul>