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
		return aurora.setHue(argv.number).then(() =>
		{
			console.log(`hue ➜ ${chalk.bold.cyan(argv.number)}`);
		});
	}

	aurora.hue().then(v =>
	{
		console.log(`hue == ${chalk.bold.cyan(v)}`);
	});
}

module.exports = {
	command:  'hue [number]',
	describe: 'get or set the hue for all panels',
	builder,
	handler
};
