'use strict';

const
	API = require('../index'),
	chalk = require('chalk'),
	fs  = require('fs');

function builder(yargs) {}

function handler(argv)
{
	let data, effect;

	try
	{
		data = fs.readFileSync(argv.filename);
		effect = JSON.parse(data);
	}
	catch (err)
	{
		console.error(err.message);
		return;
	}

	const aurora = new API();
	return aurora.addAnimation(effect).then(() =>
	{
		console.log(`Effect ${chalk.bold(effect.animName)} added.`);
	});
}

module.exports = {
	command:  'upload <filename>',
	describe: 'upload a json file containing a new animation effect',
	builder,
	handler
};
