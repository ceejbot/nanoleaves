'use strict';

const
	API   = require('../index'),
	util  = require('util');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	return aurora.animation(argv.name.join(' ')).then(animation =>
	{
		console.log(util.inspect(animation, { colors: true, depth: 5 }));
	});
}

module.exports = {
	command : 'animation <name...>',
	describe: 'get details about the given animation effect',
	builder,
	handler
};
