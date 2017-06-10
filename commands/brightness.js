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
