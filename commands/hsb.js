'use strict';

const
	API   = require('../index'),
	chalk = require('chalk');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();
	const opts = {
		hue: argv.hue,
		sat: argv.sat,
		brightness: argv.bright
	};
	aurora.multistate(opts).then(rez =>
	{
		console.log(`hue ➜ ${chalk.bold.cyan(argv.hue)}
sat ➜ ${chalk.bold.magenta(argv.sat)},
brightness ➜ ${chalk.bold.yellow(argv.bright)}`);
	});
}

module.exports = {
	command:  'hsb <hue> <sat> <bright>',
	describe: 'set the hue, sat, and brightness for all panels',
	builder,
	handler
};
