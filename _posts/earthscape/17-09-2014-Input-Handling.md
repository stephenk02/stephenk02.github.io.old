---
title: Input Handling
tags: post
category: earthscape
layout: post
comments: true
permalink: blogs/earthscape/Input-Handling
---

So this week we FINALLY got the PS Vitas for playtesting, so now comes the arduous process of making sure our games compile and run perfectly in the PSM framework. Of course this also includes input handling for the vita, which is a completely different beast input-wise than a computer. Of course I decided to tackle this particular problem, as I felt that I was the only one in the group who had no real knowledge of any Vita input code.

The Vita has four shape buttons, two shoulder buttons, start/select buttons, a D-Pad, two analogue joysticks and two touchscreens, as apposed to the pc's good ol' keyboard and mouse. The vita does have an on-screen keyboard too, but that's not really an option during gameplay.

Starting today I worked specifically on the touch screen controls, implementing an InputHandler class for both touch input and mouse input. I chose to do this to simplify things later on, an example of code shows what I mean:

```C#
static public bool IsPressed() {
#if PSM
    return (TouchPanel.GetState().Where(touchLocation => touchLocation.State 
			== TouchLocationState.Pressed).ToList().Count() > 0);
#elif WINDOWS
    return (Mouse.GetState().LeftButton == ButtonState.Pressed 
			&& oldMouse.LeftButton != ButtonState.Pressed);
#endif
}
```

The code will check the mouse for a click on the Windows platform or the touch screen for a tap on the Vita, and return true if that condition in particular is met. This particular code example also highlights the distinct difference between mouse clicks and the touch panel: when getting a TouchPanel state, a TouchCollection is returned. 

This is because the touch panel can hold multiple touch presses simultaneously, where it is impossible for a computer to have two cursors (obviously). Because of this I check if the list of pressed inputs is greater than 0, which will work in place of a pressed bool.

Tomorrow I'll be working on implementing buttons which use this touch screen functionality...