'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.off().then(() =>
	{
		console.log(`Aurora ➜ ${chalk.bold('off')}`);
	});
}

module.exports = {
	command: 'off',
	describe: 'turn your Aurora off',
	builder,
	handler
};
