//  /effects/list

const
	axios = require('axios')
	;

class Aurora
{
	constructor(opts)
	{
		this.req = axios.create({
			baseURL: `http://${opts.host}:${opts.port}/api/beta/${opts.token}`
		});
	}

	effects()
	{
		return this.req.get('/effects/list').then(rez =>
		{
			return rez.data;
		});
	}

	effect()
	{
		return this.req.get('/effects/select').then(rez =>
		{
			return rez.data;
		});
	}

	setEffect(name)
	{
		return this.req.put('/effects', { select: name }).then(rez =>
		{
			return rez.data;
		});
	}

	on()
	{
		return this.req.put('/state', { on: true }).then(rez =>
		{
			return rez.data;
		});
	}

	off()
	{
		return this.req.put('/state', { on: false }).then(rez =>
		{
			return rez.data;
		});
	}

	brightness()
	{
		return this.req.get('/state/brightness').then(rez =>
		{
			return rez.data.value;
		});
	}

	setBrightness(v)
	{
		return this.req.put('/state', { brightness: Number(v) }).then(rez =>
		{
			return rez.data;
		});
	}
}

module.exports = Aurora;
