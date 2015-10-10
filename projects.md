---
layout: page
title: Projects
permalink: /projects/
---

<ul class="list-group">
  {% for project in site.projects %}
    <li class="list-group-item">
      <h4>{{ project.title }}</h4>
      <p class="date">{{ project.date | date: "%B %e, %Y" }}</p>
      <p>{{project.desc}}</p>
      {% if project.layout == "game" %}<a href="{{ site.baseurl }}/projects/{{ project.title }}">View Game</a>
      {% elsif project.layout == "subblog" %} 
          {% if project.subblog != null %} <a href="{{ site.baseurl }}{{ project.url }}" class="read-more">View Developer Blog</a>
    	  {% else %} <a href="{{ project.external }}" class="read-more">Visit Project Website</a>
    	  {% endif %}
      {% elsif project.external != null %} <a href="{{ project.external }}" class="read-more">Visit Project Website</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>