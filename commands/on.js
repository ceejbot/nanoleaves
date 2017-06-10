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
	aurora.on().then(() =>
	{
		console.log('Your Aurora is now on.');
	});
}

module.exports = {
	command: 'on',
	describe: 'turn your aurora on',
	builder,
	handler
};
