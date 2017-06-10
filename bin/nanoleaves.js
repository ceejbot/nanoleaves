#!/usr/bin/env node

'use strict';

require('dotenv').config();

const argv = require('yargs')
		.commandDir('../commands')
		.recommendCommands()
		.version()
		.help()
		.argv;

