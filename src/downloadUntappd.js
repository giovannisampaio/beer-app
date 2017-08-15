//jshint esnext: true

require('dotenv').config();
var request = require('request');
var https = require('https');

var client_id = '&client_id=' + process.env.CLIENT_ID;
var client_secret = '&client_secret=' + process.env.CLIENT_SECRET;
var token = '?access_token=' + process.env.TOKEN;
var address = 'https://api.untappd.com/v4/';
var beer_method = 'search/beer?q=';
var bid = 'Midas Golden Pilsner';

https.get(address + beer_method + bid + client_id + client_secret, function(res) {
    console.log(address + beer_method + bid + client_id + client_secret);
    res.setEncoding('utf8');
    var str = '';
    res.on('data', (d) => str += d);
    res.on('end', () => console.log(JSON.stringify(str, null, 4)));
});