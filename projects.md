---
layout: page
title: Projects
permalink: /projects/
---

<div class="indent">
{% for project in site.projects %}
  <h3 class="entry-title">{{ project.title }}</h3>
  <p class="date">{{ project.date | date: "%B %e, %Y" }}</p>
  {% if project.language %} 
  <p class="languages">Languages Used: {{ project.language }}</p>
  {% endif %}
  {% if project.engine %} 
  <p class="languages">Engine Dependancy: {{ project.engine }}</p>
  {% endif %}
  <p class="description">{{ project.desc }}</p>
  
  {% if project.video %} 
  <div class="well-wrapper">
    <div class="well well-sm well-dark">
      <video width="100%" controls>
    	  <source src="{{ site.baseurl }}{{ project.video }}">
    	  Your browser does not support the video tag.
      </video>
    </div>
  </div>
  {% endif %}
  
  {% if project.layout == "game" %}<a href="{{ site.baseurl }}/projects/{{ project.title }}" class="btn btn-primary btn-md read-more">Play Game</a>
  {% elsif project.layout == "subblog" && project.subblog != null %} <a href="{{ site.baseurl }}{{ project.url }}" class="btn btn-primary btn-md read-more">View Developer Blog</a>
  {% elsif project.external != null %} <a href="{{ project.external }}" class="btn btn-primary btn-md read-more">Visit Project Website</a>
  {% endif %}
  <hr>
{% endfor %}

</div>