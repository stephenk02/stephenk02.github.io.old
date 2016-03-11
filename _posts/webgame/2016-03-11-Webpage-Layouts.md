---
title: Webpage Layouts
tags: post
category: webgame
layout: post
comments: true
---

<p>For our game, we're going to need to plan out the structure of the website before we implement it. For this we need to break down the various places a user might want to be on the website. For this, a sitemap is relevant and shows exactly how the flow of the website should be to users.<p>

<img src="{{site.baseurl}}/images/webgame/sitemap_v1.png" alt="game site-map" style="padding: 16px 0px 0px 0px;" class="img-responsive"/>
<p style="text-align:center; padding: 0px 0px 16px 0px;">The overall site-map of the final game, subject to change.</p>

<p>One might think, from that map, that there's a lack of seperate pages making up the game. This is true, but users should generally remain on the same page whilst playing the game. The only time they must leave this page is when undergoing important database transactions (changing email, username, doing administration, etc.). This allows players to focus on the game whilst also allowing direct seperation for those doing important things.</p>

<h4>Page Wireframes</h4>
<p>For designing a website, it helps to plan out basic layouts of each page, in order to spot any potential design issues. So without further adieu, I present some 'wireframe' webpages. The first one is a layout for the login page and as such, it's pretty simple.</p>

<img src="{{site.baseurl}}/images/webgame/wireframe_login.png" alt="game login wireframe" style="padding: 16px 0px 0px 0px;" class="img-responsive"/>
<p style="text-align:center; padding: 0px 0px 16px 0px;">The login page of the game. It will be surrounded by a layout much like this website.</p>

<p>It's definitely simple, but also incredibly functional. The blank space can be spruced up later on in the production, but the ability to both access the game via logging into an account as well as reset any potentially forgotten details are both there.</p>

<p>The next wireframe, however, is much more complicated. This is the 'main menu' of the game, which we reach when we've successfully logged into the game. For this screen we'll need to show some adequate game information, but there's also some links to the external pages within.</p>

<img src="{{site.baseurl}}/images/webgame/wireframe_lobby.png" alt="game lobby wireframe" style="padding: 16px 0px 0px 0px;" class="img-responsive"/>
<p style="text-align:center; padding: 0px 0px 16px 0px;">The lobby page of the game. Features a list of games to join as well as some utility buttons / info.</p>

<p>Now not only does the layout look nice and clean, but it satisfies the requirements of the site map. There's a button linking to each area of the site outside of the game. The admin button is offset from the rest of the buttons as it is only meant for those with higher access so not everyone will see it, and therefore the layout should not accommodate it.</p>