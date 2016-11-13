---
title: Input Processing and Fitness Metrics
tags: post
category: neural_research
layout: post
comments: true
---

Interesting developments this week! I've implemented the basic processing structure of my Quake neural network. Because of the real-time, segmented nature of the project, I've had to structure the network functionality a bit haphazardly.

When Quake is first launched, the neural network is initialized with a blank genome to match the size of the inputs + the size of the outputs + bias nodes. At this point, the network is ready to spit out numbers to tell the AI what to do. Then, during the game's update code, the index of the current genome to process is defined, starting at 0 and working its way up. The network will take this genome, determine its species and process it. This processing involves two steps. First, the network gathers input from the environment; that's done through an algorithm which I described in detail last week. Secondly, the genome will be evaluated to determine its current performance.

This evaluation is a little more involved than the input gathering. First, the input that was gathered is converted from trace data into an double array, modifying its value  to fit the specifications. For my input, I've made 0 - 1 a range that denotes static map collision, with 0 facing up and 1 facing down. 0 also denotes empty space which, as the neural network will learn, is identical in functionality to a walkable flat plane. -1 is an entity of any kind, basically a point of interest.

The second step to the evaluation is to process these inputs through the network. To do this, the inputs are loaded into the network, fed through the layers and their activation value is then retrieved. The network is then flushed, resetting its neurons and putting it into an inactive state.

The final step is to evaluate the fitness of the genome and store it. Unfortunately, I've yet to actually implement this fitness metric gathering, as well as any mutations. This means that right now the network processes the input, and spits out the same output pretty much everytime without variance. My plan is to implement a form of fitness evaluation known as novelty search. So... Why novelty search? 

Well, what novelty search does is it computes how prevalent the result is and bases its fitness off of this. Typically the prevalence of a result is determined through its final position. If the position is further away from most of the other genomes, it will have a higher fitness. Now, it's no secret that Quake's level design is not necessarily as linear as some others. For instance, the MarI/O fitness evaluation is as simple as how far right mario makes it through the level, because that is objectively a sign of progression. Because of Quake's non-linear level design, with corridors branching off into other hallways and rooms, novelty search will inevitably wind up scanning through the entire world space eventually, with genomes eventually learning how to navigate through the whole level.

I probably should've saved some of that for next week's blog post, it might get a bit thin if I can't wrap my head around how I'd go about it. Regardless, that's my goal for next week, then, after mutations, my network will be pretty much complete!

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Lehman, J. and Stanley, K.O., 2011. Novelty search and the problem with objectives. In Genetic Programming Theory and Practice IX (pp. 37-56). Springer New York.</li>
</ul>


