---
title: Redundancy Removal and File Output
tags: post
category: neural_research
layout: post
comments: true
---

This week was a bit intense! Now that I have the neural network working, I've started to strip away, optimise and fix any errors and memory leaks in the code. This is not as easy as it sounds because by the looks of things, there are a lot of issues. Now that I've come to understand, over time, how the implementation of my network would interact with and evolve through code, I'm looking at quite a bit of my code and taking away what really doesn't need to be there in order to improve the performance. For instance, I've done away with quite a few of the classes that I built into my network, for the sake of simplicity. 

I've decided to remove both the network and organism classes, in favour of just storing all data within the genome class, as well as doing away with the link and trait classes, and just storing all genetic data in genes. This has made my code much simpler and more readable whilst also retaining as much functionality as possible. It has also lowered my memory usage enough to where I can have much larger populations within the engine, which is always a plus for a neural network.

Now that I've simplified and finalized the data structure for my network, I've also implemented a save and load feature for generations within the network. This does not perfectly save the generation; it will not save its generational number or any previous generation evolutionary data, but this is not required at all to pick up and continue evolving. Actually, on that note, it also does not save the fitnesses of each genome that it saves because due to the variable timestep of the engine, results may differ for the exact same genome in evolution. This is not exactly ideal, because generally you'd want a genome to always give the same result, but alas, the engine is a bit too complex for me to come up with a solution.

Next week I'll be analyzing data from the network, trying to see just how well it can perform. I don't want to sound pessimistic, but I'm not too convinced it can fully complete the level... BUT I'D LOVE TO BE PROVEN WRONG.