/*global describe:true, it:true, before:true, after:true, beforeEach: true, afterEach:true */
/*eslint prefer-arrow-callback:0*/
'use strict';

var
	demand = require('must'),
	sinon  = require('sinon'),
	Aurora = require('./index')
	;

describe('nanoleaves', function()
{
	it('can be constructed', function()
	{
		Aurora.must.be.a.function();
		const a = new Aurora();
		a.must.be.instanceof(Aurora);
		a.must.have.property('req');
		a.must.have.property('apibase');
	});

	it('state() hits the state endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: { value: 'ok' }});
		});
		return api.state('field').then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/state/field').must.be.true();
			r.must.equal('ok');
		});
	});

	it('state() handles responses without a value field', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: 'hello' });
		});
		return api.state('field').then(r =>
		{
			stub.called.must.be.true();
			r.must.equal('hello');
		});
	});

	it('setState() hits the state endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { value: 'ok' }});
		});
		return api.setState('field', 'value').then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/state', { field: 'value' }).must.be.true();
		});
	});

	it('a giant list of functions just call state()', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api, 'state').callsFake(() =>
		{
			return Promise.resolve({ data: { value: 'ok' }});
		});

		const funcs = ['mode', 'brightness', 'saturation', 'hue', 'temperature'];
		const types = ['colorMode', 'brightness', 'sat', 'hue', 'ct'];
		const all = funcs.map(f => api[f]());

		return Promise.all(all).then(() =>
		{
			stub.called.must.be.true();
			stub.callCount.must.equal(funcs.length);
			types.forEach(t => { stub.calledWith(t).must.be.true(); });
		});
	});

	it('a giant list of functions just call setState()', function()
	{
		const api = new Aurora();
		const funcs = ['on', 'off', 'setBrightness', 'setSaturation', 'setHue', 'setTemperature'];
		const types = ['on', 'brightness', 'sat', 'hue', 'ct'];

		const stub = sinon.stub(api, 'setState').callsFake(() =>
		{
			return Promise.resolve({ data: { value: 'ok' }});
		});

		const all = funcs.map(f => api[f]('value'));

		return Promise.all(all).then(() =>
		{
			stub.called.must.be.true();
			stub.callCount.must.equal(funcs.length);
			types.forEach(t => { stub.calledWith(t).must.be.true(); });
		});
	});

	it('orientation() calls the correct api endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: { value: 'ok' }});
		});

		return api.orientation().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/panelLayout/globalOrientation').must.be.true();
		});
	});

	it('layout() calls the correct api endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: { layoutData: '1 150 1 1 1' }});
		});

		return api.layout().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/panelLayout/layout').must.be.true();
		});
	});

	it('effect() calls the correct api endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.effect().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects/select').must.be.true();
		});
	});

	it('effects() calls the correct api endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.effects().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects/list').must.be.true();
		});
	});

	it('setEffect() calls the correct api endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.setEffect('foo').then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects', { select: 'foo' }).must.be.true();
		});
	});

	it('curiously, animations() does a PUT to read all', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.animations().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects').must.be.true();
		});
	});

	it('reading a single animation isn\'t very RESTful either', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		const body = { write: { command : 'request',
			animName: 'foo',
			version : '1.0' }};

		return api.animation('foo').then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects', body).must.be.true();
		});
	});

	it('display() does the same thing; it\'s like this was the whole API once', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.display(new Aurora.Animation()).then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects').must.be.true();
		});
	});

	it('addAnimation() is also a PUT to the same endpoint', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.addAnimation({ foo: 'bar' }).then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/effects').must.be.true();
		});
	});

	it('info() hits GET /', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'get').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.info().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/').must.be.true();
		});
	});

	it('identify() does a PUT but I am okay with this', function()
	{
		const api = new Aurora();
		const stub = sinon.stub(api.req, 'put').callsFake(() =>
		{
			return Promise.resolve({ data: { }});
		});

		return api.identify().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith('/identify').must.be.true();
		});
	});

	it('newToken() POSTs to /new', function()
	{
		const axios = require('axios');
		const stub = sinon.stub(axios, 'post').callsFake(() =>
		{
			return Promise.resolve({ data: { auth_token: 'deadbeef'}});
		});

		const api = new Aurora();
		return api.newToken().then(r =>
		{
			stub.called.must.be.true();
			stub.calledWith(api.apibase + '/new').must.be.true();
			r.must.equal('deadbeef');
			stub.restore();
		});
	});
});
