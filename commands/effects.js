'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.effects().then(effects =>
	{
		console.log(`There are ${effects.length} effects:`);
		effects.forEach(e =>
		{
			console.log(`    ${chalk.blue(e)}`);
		});
	});
}

module.exports = {
	command: 'effects',
	describe: 'list available effects',
	builder,
	handler
};
