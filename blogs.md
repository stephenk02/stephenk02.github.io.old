---
layout: default
title: Blogs
permalink: /blogs/
---

<div>
{% assign sorted_cats = site.categories | sort %}
{% for category in sorted_cats %}
	{% assign sorted_posts = category[1] | reversed %}
	{% assign meme = category[0] %}

	<h3><a href="{{ site.baseurl }}/blogs/{{ meme }}"> {{ site.cleancategories[meme] }} </a></h3>
	<hr>
	<div class="section">
    {% for post in sorted_posts %}
        <h4> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h4> 
        <div class="date"> {{ post.date | date: "%B %e, %Y" }} - <a href="{{ site.baseurl }}{{ post.url }}#disqus_thread">0 Comments</a> </div>
        <div class="entry"> 
			{{ post.excerpt }} 
		</div>
	  
		{% if forloop.index >= 2 and forloop.rindex0 > 0 %}
			<a href="/{{ site.baseurl }}blogs/{{ post.category }}" class="read-more">Read {{forloop.rindex}} More Entries...</a>
			<br>
			{% break %}
		{% else %} 
			<br>
		{% endif %}
    {% endfor %}
	<br>
	</div>
{% endfor %}
</div>