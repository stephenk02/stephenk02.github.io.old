---
title: The Fitness Metric
tags: post
category: neural_research
layout: post
comments: true
---


I'm actually at a loss this week. I stumbled upon much more recent research from Kenneth O. Stanley (which I should've probably had on hand much earlier) and he basically has helped reform my initial beliefs about neural networks and the way to measure fitness. As I said in my first blog post, I was stuck in thought about the way I'd gauge fitness within the tests. However, Kenneth's paper suggests that focus should be placed on a novelty search, with the highest deviations from the previous generation gaining the highest fitness.

Previously, I had thought (with my limited knowledge) to implement fitness within my Quake experiment through some kind of waypoint system, which gauged distance travelled in any direction. By the sounds of things, this would be a much more efficient algorithm which would accomplish the same task within the game; to encourage evolution of any kind. Kenneth writes that, as long as the success state is to reach the goal, evolution will eventually bring the species to reach this state, which does make sense. The question now becomes, how long would it take to implement such a thing within Quake? It might not necessarily be required, but waiting for an evolution which will press and shoot switches could take forever. I'll have to wait and see after implementation.

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Lehman, J. and Stanley, K.O., 2011. Abandoning objectives: Evolution through the search for novelty alone. Evolutionary computation, 19(2), pp.189-223., available at: <a href="http://www.mitpressjournals.org/doi/pdfplus/10.1162/EVCO_a_00025">http://www.mitpressjournals.org/doi/pdfplus/10.1162/EVCO_a_00025</a></li>
</ul>