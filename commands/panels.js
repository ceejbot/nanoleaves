'use strict';

const
	API = require('../index');

function builder(yargs) {}

function handler(argv)
{
	const aurora = new API();

	aurora.layout().then(data =>
	{
		console.log(`${data.count} panels`);
		data.panels.forEach(p =>
		{
			var c = p.id;
			var pad = '    ';
			while (c > 10)
			{
				pad = pad.substr(1);
				c = c / 10;
			}
			console.log(`${pad}${p.id}`);
		});
	});
}

module.exports = {
	command: 'panels',
	describe: 'show the panel ids',
	builder,
	handler
};
