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
		return aurora.setTemperature(argv.number).then(() =>
		{
			console.log(`color temperature ➜ ${chalk.bold(argv.number)}`);
		});
	}

	aurora.temperature().then(v =>
	{
		console.log(`color temperature == ${chalk.bold(v)}`);
	});
}

module.exports = {
	command:  'temp [number]',
	describe: 'get or set the overall color temperature',
	builder,
	handler
};
