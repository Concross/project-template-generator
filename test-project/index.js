'use strict';

require('dotenv').config();

require('babel-register');

require('./src/app').start(process.env.PORT);