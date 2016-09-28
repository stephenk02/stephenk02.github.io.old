---
title: Implementation Methods
tags: post
category: neural_research
layout: post
comments: true
---


So with all the research I've done, I've not had much of a look previously at how I'd actually implement a neural network using genetic algorithms. It seems like there are a number of software libraries which implement neural networks in various languages, but for the purposes of research, I shall be implementing one from scratch in my project. 

For implementation, it's important to understand what a neural network is comprised of. I mean, obviously a bunch of nodes - but what do those nodes contain, and how are they represented? Well, I could tell you, or I could show you with a list of variables within each element.

A code representation of the various elements in a neural network may look something like this...

{% highlight c++ linenos=table %}
// Basic connection between neurons (genetic nodes)
struct Gene
{
	int m_iTo, m_iFrom; // Input and output neuron IDs.
	int m_iInnovation; // Used for finding corresponding genes during crossover.
	float m_fWeight; // Weight of gene connection.
	bool m_bEnabled;
}

// Genetic nodes which make up a neural network
struct Neuron
{
	std::vector<Gene> m_vInputGenes;
	int m_iValue;
}

// Network of neurons connected by genes.
struct Genome 
{ 
	std::vector<Gene> m_vGenes;
	std::vector<Neuron> m_vNeurons;
	int m_iFitness;
}

// Collection of Genomes that serve towards a specific trait.
struct Species
{
	std::vector<Genome> m_vGenomes;
	int m_iHighestFitness;
	int m_iAverageFitness;
	int m_iStaleness;
}

// The entire pool of species.
struct Pool 
{
	std::vector<Species> m_vSpecies;
	int m_iGeneration;
	int m_iCurrSpecies;
	int m_iCurrGenome;
	int m_iMaxFitness;
}
{% endhighlight %}

This representation isn't totally complete, or even necessarily the best way of doing things, as some sources do argue that the use of object orientation within the code in place of simple arrays can obfuscate and lower efficiency of the code.<sup><a href="#s2">[2]</a></sup> However, I'm not particularly concerned with efficiency; I'm merely looking for functionality.

Next week, I'll attempt to go into more depth focusing on the Quake specific representation, as I'll be getting a development environment up for that. Hopefully it will be easy...

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Stanley, K.O. and Miikkulainen, R., 2002. Evolving neural networks through augmenting topologies. Evolutionary computation, 10(2), pp.99-127.</li>
  <li id="s2">Anguelov, B., 2008. Basic Neural Network Tutorial : C++ Implementation and Source Code. Personal Blog, viewed 18/09/2016, available at: <a href="https://takinginitiative.wordpress.com/2008/04/23/basic-neural-network-tutorial-c-implementation-and-source-code/">https://takinginitiative.wordpress.com/2008/04/23/basic-neural-network-tutorial-c-implementation-and-source-code/</a></li>
  <li id="s3">SethBling, 2015. MarI/O - Machine Learning for Video Games. YouTube, viewed 18/09/2016, available at: <a href="https://www.youtube.com/watch?v=qv6UVOQ0F44">https://www.youtube.com/watch?v=qv6UVOQ0F44</a></li>
</ul>
