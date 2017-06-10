require('dotenv').config();

const
	suncalc = require('suncalc');

const API = require('./index');

const aurora = new API();

// Goal: a clock made with 12 panels
// Hour hand in deep color, minute hand in lighter color.
// Hue and brightness chosen based on time of day.

var currentMonthDay;

function pickColors()
{
	const now = new Date();
	const hour = now.getHours();
	const minute = now.getMinutes();

	const times = suncalc.getTimes(now, process.env.LAT, process.env.LONG);
	console.log(times);

	const hourPos = hour % 12 - 1;
	const minutePos = Math.ceil(minute / 5) - 1;
	console.log(`current time: ${hour}:${minute}; positions == ${hourPos}:${minutePos}`);

	// now figure out colors
}

pickColors();
