require('dotenv').config();

const
	suncalc = require('suncalc');

const API = require('./index');

const aurora = new API({
	host: process.env.HOST,
	port: process.env.PORT,
	token: process.env.AURORA_TOKEN
});

var effects = [];

aurora.effects().then(e =>
{
	effects = e;
	return aurora.effect();
})
.then(r =>
{
	console.log(`we are running effect ${r}`);
	return aurora.setEffect(effects[Math.floor(Math.random() * effects.length)]);
}).then(() =>
{
	return aurora.effect();
}).then(r =>
{
	console.log(`now running effect ${r}`);
});

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
