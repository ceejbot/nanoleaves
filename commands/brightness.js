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
			console.log(`brightness ➜ ${chalk.bold.yellow(argv.number)}`);
		});
	}

	aurora.brightness().then(v =>
	{
		console.log(`brightness == ${chalk.bold.yellow(v)}`);
	});
}

module.exports = {
	command:  'brightness [number]',
	describe: 'get or set the overall brightness',
	builder,
	handler
};
