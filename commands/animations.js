'use strict';

const
	API    = require('../index'),
	chalk  = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	return aurora.animation(argv.name).then(animation =>
	{
		console.log(animation);
	});
}

module.exports = {
	command:  'animation <name>',
	describe: 'get details about the given animation effect',
	builder,
	handler
};
