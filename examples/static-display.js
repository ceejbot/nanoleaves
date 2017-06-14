'use strict';
require('dotenv').config();
const API = require('../index');

const aurora = new API();

const homelist = [
	{ id: 143, frames: [{ r: 255, g: 0, b: 0, w: 0, transition: 50 }]},
	{ id: 34, frames: [{ r: 255, g: 51, b: 17, w: 0, transition: 50 }]},
	{ id: 245, frames: [{ r: 255, g: 102, b: 68, w: 0, transition: 50 }]},
	{ id: 77, frames: [{ r: 255, g: 153, b: 51, w: 0, transition: 50 }]},
	{ id: 219, frames: [{ r: 254, g: 174, b: 45, w: 0, transition: 50 }]},
	{ id: 94, frames: [{ r: 208, g: 195, b: 16, w: 0, transition: 50 }]},
	{ id: 49, frames: [{ r: 170, g: 204, b: 34, w: 0, transition: 50 }]},
	{ id: 5, frames: [{ r: 105, g: 208, b: 37, w: 0, transition: 50 }]},
	{ id: 2, frames: [{ r: 34, g: 204, b: 170, w: 0, transition: 50	 }]},
	{ id: 242, frames: [{ r: 17, g: 170, b: 187, w: 0, transition: 50 }]},
	{ id: 4, frames: [{ r: 51, g: 17, b: 187, w: 0, transition: 50 }]},
	{ id: 115, frames: [{ r: 68, g: 34, b: 153, w: 0, transition: 50 }]},
];

const officelist = [
	{ id: 71, r: 255, g: 0, b: 0, transition: 50 },
	{ id: 26, r: 255, g: 51, b: 17, transition: 50 },
	{ id: 72, r: 255, g: 102, b: 68, transition: 50 },
	{ id: 167, r: 255, g: 153, b: 51, transition: 50 },
	{ id: 198, r: 254, g: 174, b: 45, transition: 50 },
	{ id: 164, r: 208, g: 195, b: 16, transition: 50 },
	{ id: 68, r: 170, g: 204, b: 34, transition: 50 },
	{ id: 241, r: 105, g: 208, b: 37, transition: 50 },
	{ id: 92, r: 34, g: 204, b: 170, transition: 50 },
	{ id: 183, r: 17, g: 170, b: 187, transition: 50 },
	{ id: 170, r: 51, g: 17, b: 187, transition: 50 },
	{ id: 100, r: 68, g: 34, b: 153, transition: 50 },
];

// Can take either panel objects or the above shorthand!
aurora.setStaticPanel(officelist).then(() =>
{
	// this uses the shorthand
	const panel = {
		id: '100',
		r: 0,
		g: 0,
		b: 0
	};
	aurora.setStaticPanel(panel).then(() =>
	{
		console.log('set panel 100 to black!');
	});
});
