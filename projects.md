---
layout: page
title: Projects
permalink: /projects/
---

<div>
{% for project in site.projects reversed %}
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
  <div class="panel-group">
    <div class="panel panel-default {% if project.youtube %}embedded{% endif %} ">
	  <a data-toggle="collapse" href="#collapse{{forloop.index}}">
        <div class="panel-heading">
          <h4 class="panel-title">View Gameplay Video</h4>
        </div>
	  </a>
	  <div id="collapse{{forloop.index}}" class="panel-collapse collapse">
        <div class="panel-body">
		  {% if project.youtube %}
		    <div class="embed-responsive embed-responsive-16by9">
		      <iframe class="embed-responsive-item" src={{project.video}} allowfullscreen></iframe>
		    </div>
		  {% else %}
            <video width="100%" controls>
           	  <source src="{{ site.baseurl }}{{ project.video }}">
           	  Your browser does not support the video tag.
            </video>
		  {% endif %}
		</div>
      </div>
    </div>
  </div>
  {% endif %}
  
  <!--{% if project.layout == "game" %}<a href="{{ site.baseurl }}/projects/{{ project.title }}" class="btn btn-primary btn-md read-more">Play Game</a>
  <!--{% elsif project.layout == "subblog" && project.subblog != null %} <a href="{{ site.baseurl }}{{ project.url }}" class="btn btn-primary btn-md read-more">View Developer Blog</a>
  <!--{% elsif project.external != null %} <a href="{{ project.external }}" class="btn btn-primary btn-md read-more">Visit Project Website</a>
  <!--{% endif %}-->
  {% if forloop.last != true %}<hr>{% endif %}
{% endfor %}

</div>