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
	aurora.off().then(() =>
	{
		console.log('Your Aurora is now off.');
	});
}

module.exports = {
	command: 'off',
	describe: 'turn your aurora off',
	builder,
	handler
};
