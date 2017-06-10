'use strict';

const API = require('../index');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.info().then(data =>
	{
		console.log(JSON.stringify(data, null, 4));
	});
}

module.exports = {
	command: 'info',
	describe: 'get all available info about your Aurora',
	builder,
	handler
};
