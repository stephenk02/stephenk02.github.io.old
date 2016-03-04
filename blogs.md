---
layout: default
title: Blogs
permalink: /blogs/
---

<div>
{% assign categoryArray = '' %}
{% assign sortedPosts = site.posts sort:'category' %}
{% for post in sortedPosts %}
  {% if forloop.first %}
    <h3><a href="{{ site.baseurl }}/blogs/{{ post.category }}"> {{ site.cleancategories[post.category] }} </a></h3> 
    <ul class="list-group">
  {% endif %}
  {% if post.title %}
      <li class="list-group-item">
        <h4> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h4> 
        <div class="date"> {{ post.date | date: "%B %e, %Y" }} </div>
        <div class="entry"> {{ post.excerpt }} </div>
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
      </li>
    {% if forloop.last %}
      </ul>
	{% endif %}
  {% endif %}
{% endfor %}
</div>