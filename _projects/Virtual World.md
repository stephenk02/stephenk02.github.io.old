---
title: Virtual World
date: 9-8-2015
layout: page
comments: true
language: C++, GLSL
video: https://www.youtube.com/embed/JLKQwkJ_YsY
youtube: true
excerpt_seperator: <!--excerpt-->
---
This virtual world is a project I completed for an assignment during my second year of programming study at AIE. It is a technical demonstration which involves many different things being combined to form a basic 3D game engine.
This engine includes:
<ul class="list-group list-sm">
   <li class="list-group-item">Deferred rendering graphical pipeline.</li>
   <li class="list-group-item">Camera controls.</li>
   <li class="list-group-item">Basic pathing AI.</li>
   <li class="list-group-item">Point lights and directional lights, utilising physically based rendering with Oren-Nayer and Cook-Terrence shader algorithms.</li>
   <li class="list-group-item">Shadow maps for directional lights, featuring a noisy PCF blur.</li>
   <li class="list-group-item">Full GUI implementation to control the various elements of the engine.</li>
   <li class="list-group-item">Perlin noise for procedurally generated landscapes.</li>
   <li class="list-group-item">GPU based particle systems, with various emitter options and particle movement options.</li>
   <li class="list-group-item">PhysX integration, with collisions for procedurally generated landscapes.</li>
   <li class="list-group-item">Cloth Physics implementation.</li>
</ul>

The most challenging aspect of this was coming to terms with and understanding exactly how the CPU interfaced with the GPU to transmit various types of data (shadow-mapping, lighting data). I think I got it down though.
{{page.excerpt_seperator}}