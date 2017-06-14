'use strict';

const
	Animation = require('./animation'),
	axios     = require('axios'),
	Panel     = require('./panel')
	;

class Aurora
{
	constructor(opts)
	{
		opts = opts || {};
		opts.port = opts.port || process.env.AURORA_PORT || 16021;
		opts.host = opts.host || process.env.AURORA_HOST;
		opts.token = opts.token || process.env.AURORA_TOKEN;
		this.apibase = `http://${opts.host}:${opts.port}/api/beta`;

		this.req = axios.create({
			baseURL: `http://${opts.host}:${opts.port}/api/beta/${opts.token}`
		});
	}

	multistate(opts)
	{
		return this.req.put('/state', opts).then(rez => rez.data);
	}

	state(field)
	{
		return this.req.get(`/state/${field}`).then(rez =>
		{
			if (rez.data.hasOwnProperty('value'))
				return rez.data.value;
			return rez.data;
		});
	}

	setState(field, value)
	{
		const opts = {};
		opts[field] = value;
		return this.multistate(opts);
	}

	newToken()
	{
		return axios.post(`${this.apibase}/new`).then(rez =>
		{
			return rez.data.auth_token;
		});
	}

	info()
	{
		return this.req.get('/').then(rez => rez.data);
	}

	identify()
	{
		return this.req.put('/identify').then(rez => rez.data);
	}

	animation(name)
	{
		const body = { write: {
			command : 'request',
			animName: name,
			version : '1.0',
		}};

		return this.req.put('/effects', body).then(rez =>
		{
			const effect = new Animation(rez.data);
			return effect;
		});
	}

	animations()
	{
		const body = { write: {
			command : 'requestAll',
			version : '1.0',
		}};

		return this.req.put('/effects', body).then(rez => rez.data.animations);
	}

	addAnimation(effect)
	{
		const write = Object.assign({
			command: 'add',
			version: '1.0',
		}, effect);

		return this.req.put('/effects', { write }).then(rez => rez.data);
	}

	effects()
	{
		return this.req.get('/effects/list').then(rez => rez.data);
	}

	effect()
	{
		return this.req.get('/effects/select').then(rez => rez.data);
	}

	setEffect(name)
	{
		return this.req.put('/effects', { select: name }).then(rez => rez.data);
	}

	layout()
	{
		return this.req.get('/panelLayout/layout').then(rez =>
		{
			const ints = rez.data.layoutData.split(' ').map(i => Number(i));
			const result = {
				count: ints.shift(),
				sideLength: ints.shift(),
				panels: [],
			};

			while (ints.length)
			{
				const p = {
					id: ints.shift(),
					x: ints.shift(),
					y: ints.shift(),
					orientation: ints.shift()
				};
				result.panels.push(p);
			}

			return result;
		});
	}

	orientation()
	{
		return this.req.get('/panelLayout/globalOrientation').then(rez => rez.data.value);
	}

	on()
	{
		return this.setState('on', true);
	}

	off()
	{
		return this.setState('on', false);
	}

	mode()
	{
		return this.state('colorMode');
	}

	brightness()
	{
		return this.state('brightness');
	}

	setBrightness(v)
	{
		v = Number(v);
		if (v < 0) v = 0;
		if (v > 100) v = 100;
		return this.setState('brightness', v);
	}

	saturation()
	{
		return this.state('sat');
	}

	setSaturation(v)
	{
		v = Number(v);
		if (v < 0) v = 0;
		if (v > 100) v = 100;

		return this.setState('sat', Number(v));
	}

	hue()
	{
		return this.state('hue');
	}

	setHue(v)
	{
		v = Number(v);
		if (v < 0) v = 0;
		if (v > 360) v = 360;

		return this.setState('hue', Number(v));
	}

	temperature()
	{
		return this.state('ct');
	}

	setTemperature(v)
	{
		v = Number(v);
		if (v < 1200) v = 1200;
		if (v > 6500) v = 6500;

		return this.setState('ct', Number(v));
	}

	display(animation)
	{
		const write = Object.assign({
			command: 'display',
			version: '1.0',
		}, animation.serialize());
		write.loop = write.loop || false;

		return this.req.put('/effects', { write }).then(rez => rez.data);
	}

	setStaticPanel(input)
	{
		if (!Array.isArray(input))
			input = [input];

		const tweaked = input.map(p =>
		{
			if (p instanceof Panel)
				return p;

			const panel = new Panel(p.id);
			panel.frames.push({
				r: p.r,
				g: p.g,
				b: p.b,
				w: 0,
				transition: p.transition || 50,
			});
			return panel;
		});

		return this.effect().then(name =>
		{
			return this.animation(name);
		})
		.then(current =>
		{
			if (!current.panels)
			{
				current.animType = 'static';
				current.loop = false;
				current.panels = {};
			}

			tweaked.forEach(p => { current.panels[p.id] = p; });

			const write = Object.assign({
				command: 'display',
				version: '1.0',
			}, current.serialize());
			return this.req.put('/effects', { write }).then(rez => rez.data);
		});
	}
}

Aurora.COLOR_MODES = new Set(['effect', 'hs', 'ct']);
Aurora.ANIM_TYPES = new Set(['highlight', 'wheel', 'flow', 'explode', 'fade']);
Aurora.DIRECTIONS = new Set(['outwards', 'up', 'down', 'left', 'right']);

module.exports = Aurora;
