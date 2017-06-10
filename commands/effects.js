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
