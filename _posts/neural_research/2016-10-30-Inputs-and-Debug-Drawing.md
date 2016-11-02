---
title: Inputs and Debug Drawing
tags: post
category: neural_research
layout: post
comments: true
---

This week I spent time implementing the input as described in my previous blog post on 'Neural Design'. It wasn't as simple as I thought; there was a bit of a design problem that I had implementing it. Thinking back to last week, I implemented the SV_NeuralThink function as a serverside function, but shouldn't the client be doing everything related to AI? The neural AI should be able to pass itself off as a player if it were on a multiplayer server, so shouldn't this think be moved to the client? I was a bit hesitant because of some limitations with the tracing methods offered by the engine, but I was able to overcome this. How, you might ask? Well let me explain.

The Quake engine supports tracing through different means on the server and the client. The server may use an SV_Move in order to check all hulls existing within the level. This SV_Move function both returns a trace object with much more detailed information, as well as allows an entity to be specified to be ignored during raycasts. The clientside equivalent, a simple TraceLine function, offers neither of these, and does not naturally return the trace results of the function. This is highly problematic considering I want to gather as much information as possible from my surroundings, rather than simply knowing that I hit something.

This is limited for the most part to the server because of how entities are transmitted on the client side. The server stores entities in edict_t structs. edict stands for entity dictionary, which is basically a container for the entity that allows a bit more information on its ID and other values to be transmitted to clients in order to keep them synchronised. For the most part, clients cannot easily access edicts, which limits the usage of SV_Move to serverside. However, there is an exception. There exists a getter function for edicts which does work on the clientside, but there is not easy means of finding the ID of a specific edict... except for the local player. The local player is always stored with an ID of 1, the first edict in the entire list. This is extremely for me, obviously, because it has allowed me to use the SV_Move on the client to get more detailed trace information. Great, right? 

With this information, I set about designing a core information loop for the tracing of lines in the player's vision. For now I defined this in the rendering function to simply render the point of contact in a color specific to what the trace hit. In future it will transmit more information to the neural network. Here is the loop in code.

{% highlight c %}
void R_DrawNeuralData()
{
	//Rotation delta per cell.
	double deltaX = r_fovx / NQ_INPUT_COLS, deltaY = r_fovy / NQ_INPUT_ROWS;

	// Starting angle offset from centre. 
	// These angles combine to be the top left corner of the player's view.
	double angX = (-r_fovx + deltaX) / 2, angY = (-r_fovy + deltaY) / 2;

	// Define directional vectors.
	vec3_t view_pos;
	VectorCopy(r_refdef.vieworg, view_pos);

	// Player's directional view vectors.
	vec3_t view_f, view_r, view_u;

	// Translate the player's view angles into directional vectors.
	AngleVectors(cl.viewangles, view_f, view_r, view_u);

	// Intermediate operational vector values.
	vec3_t final_pitch, final_r, final_dir, final_pos;

	for (int i = 0; i < NQ_INPUT_ROWS; i++)
	{
		// Bool to stop rotations along pitch if centred on the player's view.
		// This exists solely for code optimisation.
		cbool midY = (i == (int)(NQ_INPUT_ROWS / 2));

		if (midY) // Pitch is the same as the view.
		{
			VectorCopy(view_f, final_pitch);
		}
		else 
		{
			//Rotate final_dir to the final pitch.
			TurnVector(final_pitch, view_f, view_u, angY + deltaY * i);
		}

		for (int j = 0; j < NQ_INPUT_COLS; j++)
		{
			// Bool to stop rotations along yaw if centred on the player's view.
			cbool midX = (j == (int)(NQ_INPUT_COLS / 2));

			if (midX) // Yaw is the same as the view
			{
				if (midY)
				{
					// The direction is the view forward.
					VectorCopy(view_f, final_dir);
				}
				else
				{
					// No need to calculate yaw. Use pitch as the final direction.
					VectorCopy(final_pitch, final_dir);
				}
			}
			else
			{
				if (midY)
				{
					// Right hasn't changed.
					VectorCopy(view_r, final_r);
				}
				else
				{
					// Calculate the new right vector using the new forward.
					CrossProduct(final_pitch, view_u, final_r);
				}

				// Rotate forward to the final yaw and subsequently final direction.
				TurnVector(final_dir, final_pitch, final_r, angX + deltaX * j);
			}

			// Scale the end direction forward by the falloff distance amount.
			VectorScale(final_dir, trace_length, final_dir);

			// Move the direction to world space and to the final pos.
			VectorAdd(final_dir, view_pos, final_pos);

			// If the client has entities, it will have the player.
			if (sv.max_edicts > 0)
			{
				// The final color of the point to draw, as defined on the quake pallete.
				int c = 15;

				// Complete a trace, ignoring EDICT_NUM(1).
				// This will always be the client's player entity.
				trace_t trace = SV_Move(view_pos, vec3_origin, vec3_origin, 
										final_pos, false, EDICT_NUM(1));

				// Calculate impact point.
				vec3_t impact;
				VectorScale(final_dir, trace.fraction, impact);
				VectorAdd(impact, view_pos, impact);

				if (!(midX && midY))
				{
					if (trace.fraction != 1.0) // fraction is 1.0 if nothing was hit.
					{
						if (trace.ent->v.solid == SOLID_BSP) // We traced a world clip.
						{
							c = 61;
						}
						else // It's an entity of some kind!
						{
							c = 79;
						}
					}
					else // Hit nothing
					{
						c = 40;
					}
				}

				R_DrawPoint(impact, max(8 * trace.fraction, 1), c);
			}
		}
	}
}
{% endhighlight %}

Looking at this code, I start at the top left corner of the player's view, taking into consideration FoV. This allows me to accurately fire traces along the screen in both directions by calculating a delta angle that will take me from the top left to the bottom right after i and j rotations. I fire off traces during each loop and draw the impact point on the screen, using a color based on the type of the entity. The result can be seen below.

<img src="{{site.baseurl}}/images/neural_research/quake_input_example_v1.jpg" alt="Demonstration of Input traces in Quake." class="img-responsive post-image"/>
<p class="post-image-caption">A grid of trace points drawn within Quake. Colors represent entity type contacted. Yellow = World, Red = Entity, Blue = Nothing (Trace fell short)</p>

So why's this example important? Well it demonstrates the information I can gather from the entities, and shows how the neural network will see things when its fully implemented. Which will be soon. Hopefully.