---
title: Database Structure
tags: post
category: webgame
layout: post
comments: true
---

So, first thing's first for database design, and that's planning the structure of the database <i>prior</i> to implementation. This is definitely an important stage in the designing of any database, as deciding how data will be stored as it becomes apparent is a poor decision to make. It conflicts with how SQL works, and can leave the program with potentially vital data missing. Because SQL needs to have each column of data defined immediately upon creation, we definitely need to know everything beforehand.

<h4>So Where Do We Start?</h4>
For planning this database, we will need to identify our important data. That's not all, however, as we need to ensure the data is normalised to a reasonable level, as well as accessible. To do this, we should break the database down into a few key areas of data, based on what objects will be generating data within the game. The most notable objects are as follows:

<ul>
  <li>Players</li>
  <li>Games in progress</li>
</ul>
 
Players will be issued an identifier number when their database entry is created. They will also require login details. This includes a username, a password and a password encryption key, known as a salt. The password will be stored with encryption in the database, with the salt being used to decrypt it when required.<sup><a href="#s1">[1]</a><a href="#s2s">[2]</a></sup> 

Players will also naturally need to store some traits related to their current game, such as the game's ID and what character they've chosen.

If this is going to be accessed via the internet, the database will have to keep track of games that are currently being played, as well as information on these games. The database will need to store data about games, e.g. The time created, the current player count and what level the game is on. Players within the game, the current game turn and what time the game started are also relevant at this point.

<h4>Let's Put It Into Some Tables</h4>
Looking at the data requirements we can observe something; the objects are all interconnected via some means to each other. If we're looking to conform to the highest possible normal form for our database, this is vital to understand. When designing our database tables we can potentially access any required data from any table, simply using the foreign keys which will naturally be present within the table. Here I'm going to present some examples of the first table structures.

<img src="{{site.baseurl}}/images/webgame/player_table.png" alt="player database table" style="padding: 16px 0px 0px 0px;" class="img-responsive"/>
<p style="text-align:center; padding: 0px 0px 16px 0px;">A sample of players within the database. Note how the passwords are encrypted.

A piece of data in the player table above not mentioned yet is the Access Level column. This serves to identify the power any particular user would have in accessing the database. A number of 1 represents the average user, which cannot read/write directly to the database, but can only do so through means given to them (choosing a character on the select screen, changing their password through a prompt). An access level of two would be for administrators. This allows them to read/write directly to and from the database, making changes where they see fit. In order to prevent issues however, they will not be able to overwrite passwords. This must be done through a direct connection to the SQL, using the server's master password.

<img src="{{site.baseurl}}/images/webgame/game_table.png" alt="game database table" style="padding: 16px 0px 0px 0px;" class="img-responsive"/>
<p style="text-align:center; padding: 0px 0px 16px 0px;">A sample of games within the database. Note how they store players within them.

We can see that the games will store player IDs, which we can use to access player data. The players also store any game they are currently in. With this we can access the entire database as long as we know what we want, and who we want it from. For instance, in the lobby we may need to access the names of each player, if someone wanted to get more information on the game before they joined it. Here we would access the player table from the game table, pulling the usernames of each person in the database and displaying it for the would-be player looking to join.

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">The PHP Group, 'Safe Password Hashing', viewed 04/03/2016, available: <a href="http://php.net/manual/en/faq.passwords.php">http://php.net/manual/en/faq.passwords.php</a></li>
  <li id="s2">Alias, E. 2013, 'How to store passwords safely with PHP and MySQL', alias.io, viewed 04/03/2016, available: <a href="https://alias.io/2010/01/store-passwords-safely-with-php-and-mysql/">https://alias.io/2010/01/store-passwords-safely-with-php-and-mysql/</a></li>
</ul>