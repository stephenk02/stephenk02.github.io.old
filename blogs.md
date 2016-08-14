---
layout: default
title: Blogs
permalink: /blogs/
---

<div>
{% assign sorted_cats = site.categories | sort %}
{% for category in sorted_cats %}
	{% assign name = category[0] %}
	{% assign sorted_posts = category[1] | reversed %}
	{% assign last_post = category[1] | last %}

	<section class="blog">
		<div class="blog-header">
			<h3><a href="{{ site.baseurl }}/blogs/{{ name }}"> {{ site.cleancategories[name] }} </a> <small class="date"> - Started {{ last_post.date | date: "%B %e, %Y" }}</small></h3>
			
		    <p class="desc"> {{ site.categorydesc[name] }} </p>
		</div>

		<div class="blog-posts">
	    {% for post in sorted_posts %}
	    	<div class="blog-post">
		        <h4> <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> </h4> 
		        <div class="date"> {{ post.date | date: "%B %e, %Y" }} - <a href="{{ site.baseurl }}{{ post.url }}#comments"><span class="disqus-comment-count" data-disqus-identifier="{{ post.id }}">0</span> Comments</a> </div>
		        <div class="desc"> 
					{{ post.excerpt }} 
				</div>
			  
				{% if forloop.index >= 2 and forloop.rindex0 > 0 %}
					<a href="/{{ site.baseurl }}blogs/{{ post.category }}" class="read-more">Read {{forloop.rindex}} More Entries...</a>
					{% break %}
				{% endif %}
			</div>
	    {% endfor %}
	    {% if forloop.last != true %} <hr> {% endif %}
		</div>
	</section>
{% endfor %}
</div>