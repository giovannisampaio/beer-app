require('dotenv').config();
var request = require('request');
var https = require('https');

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
console.log(client_id, client_secret)