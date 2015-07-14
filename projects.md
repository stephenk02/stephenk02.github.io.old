---
layout: page
title: Projects
permalink: /projects/
---

<table style="width:100%">
	<tbody class="projects">
    {% for project in site.projects %}
      <tr class="post">
        <td align="center" style="width:20%"> {% if project.layout == "game" %}<a href="{{ site.baseurl }}/projects/{{ project.title }}">{% endif %}{{ project.title }}</a></td>
        <td align="center" style="width:20%" class="date">{{ project.date | date: "%B %e, %Y" }}</td>
        <td align="left" style="width:60%">
		  <p>{{project.desc}}</p>
		  <table style="width:100%">
		    <tr>
		      {% if project.layout == "subblog" %}
		        <td style="width:50%"><a href="{{ site.baseurl }}{{ project.url }}" class="read-more">View Developer Blog</a></td>
		      {% endif %}
		      {% if project.github %}
		        <td style="width:50%"><a href="{{project.github}}" class="read-more">View on GitHub</a></td>
		      {% endif %}
			</tr>
		  </table>
		</td>
      </tr>
    {% endfor %}
	</tbody>
</table>

<!-- 
      
        <div class="entry">
      	{{ post.excerpt }}
        </div>
      
        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Blog</a>
-->