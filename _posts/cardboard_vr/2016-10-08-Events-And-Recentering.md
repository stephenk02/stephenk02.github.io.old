---
title: Events and Recentering
tags: post
category: cardboard_vr
layout: post
comments: true
---

This week I've continued to flesh out the inheritence entities, with both variables / functions as well as events. I've also implemented the ability to recenter the camera view in the direction the player is looking.

Events in C# are basically a stored list of functions from anywhere within the program that are run when the event is called. The event takes a delegate as its type definition, and each of the functions stored in the list must match the structure of the delegate. An example of events in code can be seen below:

{% highlight c# linenos=table %}
public abstract class Sentient : Entity
{
	public delegate void EntityDamagedDelegate(GameObject a_entity, int a_damage);
	public delegate void EntityKilledDelegate(GameObject a_entity, GameObject a_other);

	public event EntityDamagedDelegate OnEntityDamaged;
	public event EntityKilledDelegate OnEntityKilled;

	/// <summary>
	/// Helper function to apply damage and check if an entity has lost all their health.</summary>
	/// <param name="a_other">The gameobject that inflicted the damage.</param>
	/// <param name="a_damage">The amount of damage the entity should take.</param>
	protected virtual void TakeDamage(GameObject a_other, int a_damage)
	{
	    health -= a_damage;
	    OnEntityDamaged(gameObject, a_damage);
	    if (health <= 0) Die(a_other);
	}

	/// <summary>
	/// Kills the entity. Death Effects are applied here. </summary>
	/// <param name="a_other">The gameobject that inflicted the damage</param>
	protected virtual void Die(GameObject a_other)
	{
	    Destroy(gameObject);
	    OnEntityKilled(gameObject, a_other);
	}
}
{% endhighlight %}

We can see from this code that the delegates define a function's structure. These delegates are then used as the type for events, which defines their structure and the events to be called with their arguments. We can see that the EntityDamagedDelegate takes an entity and a damage value. The TakeDamage function then calls this event and passes in the relevant arguments. Because the OnEntityDamaged event is public, other classes can add their own functions to it, and all these functions will be called.

The inspiration for implementing these events comes from both Google VR's SDK, which has a few events of its own which I've taken advantage of, as well as my experience with Valve's Source SDK, where every entity has a number of different events that other entities can subscribe to. My implementation will allow this form of event subscription that any entity could use to run functions with. For example, imagine a button that opens a door when it is shot, or a wall that lowers when every tank in an area is killed. It's an extremely simple addition to the code, but it is very powerful for level design.

Also, as I said at the start of the post, I've also implemented a recentering mechanic for aiming, which I'm actually pretty proud of. It's also pretty simple, but basically it rotates the body of the tank to match the direction its turret is looking. I like it because its an immersive way to recenter the camera, without causing any jitter or snap. It just happens, ya know? 

Anyways, that's all for this week. I'll continue to flesh out the various classes within the game in the weeks to follow. Hopefully I'll be done with classes by the next week.