/*global describe:true, it:true, before:true, after:true, beforeEach: true, afterEach:true */
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

});
