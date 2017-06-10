'use strict';

const
	API     = require('../index'),
	chalk   = require('chalk'),
	columns = require('cli-columns')
	;

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.effects().then(effects =>
	{
		console.log(`${chalk.bold(effects.length)} effects:`);
		console.log(columns(effects));
	});
}

module.exports = {
	command: 'effects',
	describe: 'list available effects',
	builder,
	handler
};
