'use strict';

require('dotenv').config();
const axios = require('axios');

console.log('Hold the power button until the LED flashes, then run this.')

axios.post(`http://${process.env.PORT}:${process.env.PORT}/api/v1/new`).then(rez =>
{
	console.log(rez.status);
	console.log(rez.data);
});
