'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	if (argv.name)
	{
		return aurora.setEffect(argv.name).then(() =>
		{
			console.log(`effect ➜ ${chalk.bold(argv.name)}`);
		});
	}

	aurora.effect().then(name =>
	{
		console.log(`running effect: ${chalk.bold(name)}`);
	});
}

module.exports = {
	command:  'effect [name]',
	describe: 'get or set the current effect',
	builder,
	handler
};
