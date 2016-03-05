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
  
  <ul class="list-group">
    {% for post in sorted_posts %}
	  
      <li class="list-group-item">
        <h4> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h4> 
        <div class="date"> {{ post.date | date: "%B %e, %Y" }} </div>
        <div class="entry"> {{ post.excerpt }} </div>
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </li>
	  
	  {% if forloop.index >= 2 and forloop.rindex0 > 0 %}
        <li class="list-group-item">
          <a href="/{{ site.baseurl }}blogs/{{ post.category }}" class="read-more">Read {{forloop.rindex}} More Entries...</a>
        </li>
	    {% break %}
	  {% endif %}
    {% endfor %}
  </ul>
{% endfor %}
</div>