---
layout: page
title: Projects
permalink: /projects/
---

Projects I have worked on.

---

<div class="posts">
  <table style="width:100%">
    <tr>
	  <th align="center" style="width:25%"><h2>Title</h2></th>
	  <th align="center" style="width:15%"><h2>Started</h2></th>
	  <th align="center" style="width:60%"><h2>Description</h2></th>
	</tr>
    {% for post in site.categories.project %}
      <tr>
        <td align="center"><a href="{{ site.baseurl }}/Matcherooni">{{ post.title }}</a></td>
        <td align="center" class="date">{{ post.date | date: "%B %e, %Y" }}</td>
        <td align="left"><p>{{post.desc}}</p>{% if post.blog %}<a href="{{ site.baseurl }}{{ post.url }}"><p>Read more on dev blog...</p></a>{% endif %}</td>
      </tr>
    {% endfor %}
  </table>
</div>

<!-- 
      
        <div class="entry">
      	{{ post.excerpt }}
        </div>
      
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Blog</a>
-->