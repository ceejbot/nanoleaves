'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	if (argv.name.length > 0)
	{
		const eff = argv.name.join(' ');
		return aurora.setEffect(eff).then(() =>
		{
			console.log(`effect ➜ ${chalk.bold(eff)}`);
		});
	}

	aurora.effect().then(name =>
	{
		console.log(`running effect: ${chalk.bold(name)}`);
	});
}

module.exports = {
	command:  'effect [name...]',
	describe: 'get or set the current effect',
	builder,
	handler
};
