---
title: Crunch Time
tags: post
category: earthscape
layout: post
comments: true
---

With the project being due at the end of next week, and me feeling my work over the prior week was inadequate, it was time to do some minor crunch-time over the weekend. This involved heavy optimisation of the mini-map code I previously created. This didn't take to much time to implement, but basically involved me using matrix transforms rather than moving each tile about, something which I REALLY shouldn't have been doing in the first place :P.

The other feature which was the main focus was to implement switches and doors that could be triggered by said switches. To do this I confined both to a single class inherent from the base entity class - the triggerable class. This is because both are triggered by other objects; the lever by the player and the door by the lever. As such I made it so that each triggerable holds a link to another triggerable inside it. When the linked triggerable is triggered, the original triggerable is triggered to. In English, if a switch is flipped, a door is opened.

It was easy enough to implement this, just having the player attack the switch would trigger the lever and thus any doors that held a link to the lever, but loading this in from the map was another story. In the end I gave each a name, either door_ or lever_, as well as a number suffix. Any doors with the same number suffix as a lever would hold that lever as a link, and thus open when the lever was triggered. Fairly simple stuff. :^) An example can be seen below, before the switch is flipped and after it is flipped.

![Demonstration of switch object]({{ site.baseurl }}/images/earthscape/4.png "Switches and doors")	