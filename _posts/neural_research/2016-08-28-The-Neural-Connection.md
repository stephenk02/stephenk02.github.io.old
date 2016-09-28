---
title: The Neural Connection
tags: post
category: neural_research
layout: post
comments: true
---


Haha, This post marks the first of my posts on my research project! I've decided to research applications of neural networks through genetic algorithms, in order to complete a task in a game. In my case, this would be completing a stage in the original Quake. Previous implementations of neural AI exist in other games, with the earliest ones being simple games such as Tetris<sup><a href="#s1">[1]</a></sup> and more recently, Super Mario World for the SNES<sup><a href="#s2">[2]</a></sup> but implementing this for Quake would be a much more interesting endeavour. I'm excited to attempt something of the like for Quake because - despite the goal being incredibly similar to games like Mario (reach the end of the level), the 3D structure of the game and the non-linearity of the levels would make for an interesting implementation of the AI.

I'm not entirely sure how neural networks works as of now, but over the next couple of weeks I'll be reading through various academic papers to gain a proper understanding of every detail required in implemenation. I do, however, know that neuro-evolution requires at least an understanding of how well the current genome has performed in relation to its predecessors. Often this metric is termed 'fitness'. I've been giving serious thought to how a species might measure its fitness during a level of Quake and, whilst it remains to be seen, I think a system measuring the AI's health and distance travelled throughout the level would be good. I'll have to see how it pans out and tinker with anything that needs tinkering with. Next week I'll begin my research into neuroevolution and genetic algorithms. Let's see how it goes!

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Luca Di Leo. 2009. 'Tetris AI - Genetic Programming Vs Tetris Game', YouTube, viewed 27/8/2016, available at: <a href="https://www.youtube.com/watch?v=_nklY5lFZAY">https://www.youtube.com/watch?v=_nklY5lFZAY</a></li>
  <li id="s2">Seth Bling. 2015. 'MarI/O - Machine Learning for Video Games', YouTube, viewed 27/8/2016, available at: <a href="https://www.youtube.com/watch?v=qv6UVOQ0F44">https://www.youtube.com/watch?v=qv6UVOQ0F44</a></li>
</ul>