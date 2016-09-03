---
title: Wheels and Hills
tags: post
category: cardboard_vr
layout: post
comments: true
---

<p>
The second week of development has come and gone and whilst I didn't get too much time to work on things (due to external factors out of my control) I did get a chance to review the tank controls and start work on the first level within the game.
</p>
<p>
For my tank, I previously used a system of movement which push the tank forward from its centre of mass, which I decided was actually a terrible idea for the final product. So, instead, I've taken advantage of Unity's WheelCollider object, which applies a flat wheel object against an axle, both of which are invisible. I've attached 10 wheels along the bottom of my tank, which appears to have both given it realistic handling along hills (I'll demonstrate that in a second), as well as given it a more realistic handling. Right now the tank is a little slip-slidy, but I'm sure this will be resolved later in development.
</p>

<img src="{{site.baseurl}}/images/cardboard_vr/tank_1.jpg" alt="Example of tank, with suspension supporting wheel tracks." class="img-responsive post-image"/>
<p class="post-image-caption">The latest developer build version of the tank. Note the wheels with suspension.</p>

<p>As demonstrated, realistic wheel travelling is possible through use of suspensions within the wheelcollider, which are the orange lines along the wheels in the image. These allow the wheel to move up and down slightly against ground, allowing travel in the bumpy environments which the game will be host to. Whilst there arent any tyres modelled for the tank, this will change when my artist finishes an early model next week. For now I will continue to tweak this and start work on enemies within the game!</p>