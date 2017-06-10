#!/usr/bin/env node

'use strict';

require('dotenv').config();

require('yargs')
	.commandDir('../commands')
	.recommendCommands()
	.version()
	.help()
	.argv;

