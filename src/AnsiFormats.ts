enum AnsiFormats {
	Bold = 1,
	Dim = 2,
	Italic = 3,
	Underline = 4,
	Flashing = 5,
	Strikethrough = 9,
	Black = 30,
	Red = 31,
	Green = 32,
	Yellow = 33,
	Blue = 34,
	Purple = 35,
	Cyan = 36,
	White = 37,
	BlackBackground = 30 + 10,
	RedBackground = 31 + 10,
	GreenBackground = 32 + 10,
	YellowBackground = 33 + 10,
	BlueBackground = 34 + 10,
	PurpleBackground = 35 + 10,
	CyanBackground = 36 + 10,
	WhiteBackground = 37 + 10,
	Grey = 30 + 60, // LightBlack
	LightRed = 31 + 60,
	LightGreen = 32 + 60,
	LightYellow = 33 + 60,
	LightBlue = 34 + 60,
	Pink = 35 + 60, // LightPurple
	LightCyan = 36 + 60,
	//LightWhite = 37 + 60,
	GreyBackground = 30 + 10 + 60, // LightBlackBackground
	LightRedBackground = 31 + 10 + 60,
	LightGreenBackground = 32 + 10 + 60,
	LightYellowBackground = 33 + 10 + 60,
	LightBlueBackground = 34 + 10 + 60,
	PinkBackground = 35 + 10 + 60, // LightPurpleBackground
	LightCyanBackground = 36 + 10 + 60,
	//LightWhiteBackground = 37 + 10 + 60
}

export default AnsiFormats;
