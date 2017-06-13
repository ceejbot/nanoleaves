'use strict';

module.exports = class Panel
{
	constructor(id)
	{
		this.id = String(id);
		this.frames = [];
	}

	serialize()
	{
		var result = `${this.id} ${this.frames.length}`;
		this.frames.forEach(f =>
		{
			result += ` ${f.r} ${f.g} ${f.b} ${f.w} ${f.transition}`;
		});
		return result.trim();
	}
};

