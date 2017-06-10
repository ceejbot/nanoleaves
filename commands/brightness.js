'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	if (argv.number)
	{
		return aurora.setBrightness(argv.number).then(() =>
		{
			console.log(`Brightness set to ${chalk.magenta(argv.number)}.`);
		});
	}

	aurora.brightness().then(v =>
	{
		console.log(`Brightness set to ${chalk.magenta(v)}.`);
	});
}

module.exports = {
	command:  'brightness [number]',
	describe: 'get or set the overall brightness',
	builder,
	handler
};
