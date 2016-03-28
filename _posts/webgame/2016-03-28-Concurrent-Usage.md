---
title: Concurrent Usage
tags: post
category: webgame
layout: post
comments: true
---

<p>When considering multiple users accessing the game and its databases, some problems can arise. These problems can be broken down into two categories, which I'll be dealing with one at a time.</p>

<h3>Functional Problems</h3>
<p>Firstly, the functional issues rise as a result of concurrent database access. The problem with concurrent database access is that most database operations happen in steps. If two people decide to modify a specific value by increasing it by one, the value might not correctly change. How does this occur? If two people call 'SELECT * FROM TABLE' at the same time, then one modifies their value and the other modifies their value, both users will have modified the original value, with the second modification being the one that persists! </p>
<p>SQL has ways of dealing with this. We must first establish what we would consider the potential for concurrent database transactions to occur. If we assume that there won't be many, we can apply an optimistic concurrency model which favours accessibility by allowing multiple users to read data and one user to write data simultaneously. The alternative, which would be more appropriate in my particular web game, would be the pessimistic model. This model requires data to be locked whenever a transaction requests access to it. This means that whilst two people can't access the same data, there will be no chance of data being modified incorrectly.<sup><a href="#s1">[1]</a><a href="#s2s">[2]</a></sup></p>
<p>With this in mind, database access will occur in my game whenever a player wishes to set values for themselves, or during game logic. Because of this, a locked down approach is more appropriate because whilst user data change is rarely done by two people to s a single record, game records can change depending on many different factors.</p>

<h3>Design Problems</h3>
<p>With the technical issues out of the way, consideration must be placed in how players should interact with the game. Players will join a lobby and once the game starts they will take turns making moves on the board. If the lobby is not full when the game starts, players may join in during gameplay if the lobby is public. Because of how complex and error-prone it might be to insert players into the game during a player's turn, it would be much better to have them wait until the end of a set of turns before letting them in. This nullifies a lot of problems, but with the inherent issue of not being able to immediately join a game.</p>

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Dave, P. 2012, 'SQL SERVER – Concurrency Basics', SQLAuthority, viewed 28/03/2016, available: <a href="http://blog.sqlauthority.com/2012/11/15/sql-server-concurrency-basics-guest-post-by-vinod-kumar/">http://blog.sqlauthority.com/2012/11/15/sql-server-concurrency-basics-guest-post-by-vinod-kumar/</a></li>
  <li id="s2">Kumar, V. 2012, 'SQL Server: Locking basics', viewed 28/03/2016, available: <a href="http://blogs.extremeexperts.com/2012/11/15/sql-server-locking-basics/">http://blogs.extremeexperts.com/2012/11/15/sql-server-locking-basics/</a></li>
</ul>

