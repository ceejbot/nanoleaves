'use strict';;
require('dotenv').config();
const API = require('../index');
const aurora = new API();

const effect = new API.Animation({
	animName: 'test',
	animType: 'static',
	loop: false,
});

const list = [
	{ id: 92, frames: [{ r: 0, g: 20, b: 225, w: 0, transition: 50 }]},
	{ id: 71, frames: [{ r: 0, g: 40, b: 200, w: 0, transition: 50 }]},
	{ id: 198, frames: [{ r: 0, g: 60, b: 175, w: 0, transition: 50 }]},
	{ id: 167, frames: [{ r: 100, g: 80, b: 150, w: 0, transition: 50 }]},
	{ id: 241, frames: [{ r: 0, g: 100, b: 125, w: 0, transition: 50 }]},
	{ id: 164, frames: [{ r: 40, g: 120, b: 100, w: 0, transition: 50 }]},
	{ id: 72, frames: [{ r: 0, g: 140, b: 75, w: 0, transition: 50 }]},
	{ id: 100, frames: [{ r: 100, g: 160, b: 50, w: 0, transition: 50 }]},
	{ id: 170, frames: [{ r: 200, g: 0, b: 0, w: 0, transition: 50 }]},
	{ id: 183, frames: [{ r: 0, g: 200, b: 0, w: 0, transition: 50 }]},
];

list.forEach(p =>
{
	const panel = new API.Panel(p.id);
	panel.frames = p.frames;
	effect.panels[p.id] = panel;
});
aurora.display(effect);

