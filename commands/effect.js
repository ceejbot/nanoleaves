'use strict';

const
	API    = require('../index'),
    chalk  = require('chalk'),
    aurora = new API({
		host: process.env.HOST,
		port: process.env.PORT,
		token: process.env.ACCESS_TOKEN
	});

function builder(yargs) {}

function handler(argv)
{
	if (argv.name)
	{
		return aurora.setEffect(argv.name).then(() =>
		{
			console.log(`Effect is now ${argv.name}.`);
		});
	}

	aurora.effect().then(name =>
	{
		console.log(`The current effect is ${chalk.magenta(name)}.`);
	});
}

module.exports = {
	command:  'effect [name]',
	describe: 'get or set the current effect',
	builder,
	handler
};
