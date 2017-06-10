'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();
	console.log('Hold the power button until the LED flashes, then run this.');
	aurora.newToken().then(token =>
	{
		console.log(`token ➜ ${chalk.bold(token)}
Export this in the AURORA_TOKEN environment variable.`);
	});
}

module.exports = {
	command: 'token',
	describe: 'generate a new API access token',
	builder,
	handler
};
