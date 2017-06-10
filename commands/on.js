'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.on().then(() =>
	{
		console.log(`Aurora ➜ ${chalk.bold('on')}`);
	});
}

module.exports = {
	command: 'on',
	describe: 'turn your Aurora on',
	builder,
	handler
};
