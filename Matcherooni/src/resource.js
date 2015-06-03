var s_SplashScreen = "splash_screen.png";
var s_CloseNormal = "CloseNormal.png";
var s_CloseSelected = "CloseSelected.png";

var s_AIE = "aie-logo.png"
var s_CIT = "cit-logo.jpg"

var s_MenuButtons = "UI/menu_buttons.png";
var s_Grid = "Grid.png";
var s_NextBar = "UI/next_bar.png";

var s_TouchBot = "UI/touch_bot.png";
var s_TouchSide = "UI/touch_side.png";
var s_TouchCorner = "UI/touch_corner.png";

var s_Block = "block.png";
var s_Emotes = "emotes.png";
var s_Explosion = "explosion.png";

var s_ExplosionFrames = "explosion.plist";
var s_EmotesFrames = "emotes.plist";
var s_MenuButtonFrames = "UI/menu_buttons.plist";

var s_Box = "tint_box.png";
var s_SelectArrow = "UI/select_arrow.png";
var s_SelectArrowSide = "UI/select_arrow_side.png";

var s_MorningStart = "bgm/morning_start.mp3"
var s_MorningLoop = "bgm/morning_loop.mp3"

var s_AfternoonStart = "bgm/afternoon_start.mp3"
var s_AfternoonLoop = "bgm/afternoon_loop.mp3"

var s_NightStart = "bgm/night_start.mp3"
var s_NightLoop = "bgm/night_loop.mp3"

var s_LateNightStart = "bgm/late_night_start.mp3"
var s_LateNightLoop = "bgm/late_night_loop.mp3"

var s_BlockBreak = "sfx/block_break.wav"

var g_base = [
    //image
    {src:s_SplashScreen},
    {src:s_CloseNormal},
    {src:s_CloseSelected},
	{src:s_Box},
	{src:s_AIE},
	{src:s_CIT},
	
    //plist

    //fnt

    //tmx

    //bgm

    //effect
];

var g_menu = [
    //image
	{src:s_MenuButtons},
	{src:s_Grid},

    //plist
	{src:s_MenuButtonFrames},

];

var g_game = [
    //image
	{src:s_NextBar},
	{src:s_Block},
	{src:s_Emotes},
	{src:s_Explosion},
	{src:s_TouchBot},
	{src:s_TouchSide},
	{src:s_TouchCorner},
	{src:s_SelectArrow},
	{src:s_SelectArrowSide},
	
    //plist
	{src:s_EmotesFrames},
	{src:s_ExplosionFrames},
	
	//sfx
	{src:s_BlockBreak}
];