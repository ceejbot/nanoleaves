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
		return aurora.setSaturation(argv.number).then(() =>
		{
			console.log(`saturation ➜ ${chalk.bold.magenta(argv.number)}`);
		});
	}

	aurora.saturation().then(v =>
	{
		console.log(`saturation == ${chalk.bold.magenta(v)}`);
	});
}

module.exports = {
	command : 'saturation [number]',
	describe: 'get or set the overall saturation',
	builder,
	handler
};
