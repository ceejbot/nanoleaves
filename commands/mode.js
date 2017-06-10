'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();
	aurora.mode().then(v =>
	{
		console.log(`color mode == ${chalk.bold.green(v)}`);
	});
}

module.exports = {
	command:  'mode',
	describe: 'get the current color mode for the Aurora',
	builder,
	handler
};
