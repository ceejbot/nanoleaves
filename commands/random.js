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
		const pick = effects[Math.floor(Math.random() * effects.length)];
		console.log(`effect ➜ ${chalk.bold(pick)}`);
		return aurora.setEffect(pick);
	}).catch(err =>
	{
		console.error(`That didn't work: ${err.message}`);
	});
}

module.exports = {
	command:  'random',
	describe: 'run a randomly-chosen effect',
	builder,
	handler
};
