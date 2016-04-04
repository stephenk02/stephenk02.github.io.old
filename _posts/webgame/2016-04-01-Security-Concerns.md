---
title: Security Concerns
tags: post
category: webgame
layout: post
comments: true
---

<p>For any kind of database access online, there needs to be a form of security. If people can intercept either the database itself or the connection to the database, data could be viewed, modified and generally compromised. This is never a good thing. Thankfully the PHP framework Laravel provides mechanisms to subvert these issues with its MVC architectural designs.</p>

<h3>What is Laravel?</h3>
<p>Laravel is a PHP framework which utilises MVC architecture to generate pages for its users. MVC architecture, or Model-View-Controller architecture, is an architecture designed to seperate page access into different stages with limited access to each other. For security purposes, it seperates the client and server by only providing the client access to the data they require in order to generate their webpage. Otherwise, if we wanted to generate a page on the clientside, we would need the database to search through. A client could then view the contents of this database via external means.</p>

<p>Aside from the architecture, Laravel provides support for secure database transactions.<sup><a href="#s1">[1]</a></sup> Secure database support is provided through the database migration system implemented in the framework. Database creation is done through PHP via the framework, so this in turn avoids SQL injections. There is a potential for another kind of vulnerability via HTML, but Laravel allows assigning a hidden tag to database table columns to guard against this. These vulnerabilities are not as extreme as injection however, and can only modify non-hidden columns when an entry is created. For our game, a user is created using the following php code. 
{% highlight php %}
class User extends Model
{
	protected $fillable = [
		'name', 'email', 'password',
	];
	protected $hidden = [
		'password', 'remember_token', 'is_admin'
	];
}
{% endhighlight %}
<p>if is_admin was in the $fillable array, a user creating a database entry could modify is_admin to true. This could give them access to other people's account information and the ability to modify running games at will!</p>

<h3>Other Security Considerations</h3>
<p>For transmission of sensitive data between a server and client, an SSL secured connection is much preferred to an unsecured connection. With XAMMP we can enable this by accessing the web server from its default secure port (443). If we wanted connections to always be secure, we could modify the secure port to be the default web port (80).</p>

<h4>Sources</h4>
<ul class="sources">
  <li id="s1">Laravel 2015, 'Authentication', viewed 04/04/2016, available: <a href="https://laravel.com/docs/5.2/authentication">https://laravel.com/docs/5.2/authentication</a></li>
</ul>

