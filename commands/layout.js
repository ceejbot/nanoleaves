'use strict';

const API = require('../index');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.layout().then(data =>
	{
		console.log(JSON.stringify(data, null, 4));
	});
}

module.exports = {
	command: 'layout',
	describe: 'show the panel layout',
	builder,
	handler
};
