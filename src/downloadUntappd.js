//jshint esnext: true

require('dotenv').config();
var request = require('request');
var https = require('https');
var beerList = require('./products2.json');
var fs = require('fs');

var client_id = '&client_id=' + process.env.CLIENT_ID;
var client_secret = '&client_secret=' + process.env.CLIENT_SECRET;
var token = '?access_token=' + process.env.TOKEN;
var address = 'https://api.untappd.com/v4/';
var beer_method = 'search/beer?q=';
var bid = 'Schlappeseppel Dunkel';

// https.get(address + beer_method + bid + client_id + client_secret, function(res) {
//         res.setEncoding('utf8');
//         var str = '';
//         res.on('data', (d) => str += d);
//         res.on('end', () => console.log(JSON.parse(str).response.beers.items[0].beer.bid));});
// Object.keys(beerList).forEach(function(a) {
for (var a = 0; a < 4; a++) {

    if(beerList[a].bid) return;
    var namn = beerList[a].Namn;
    namn += beerList[a].Namn2 ? ' ' + beerList[a].Namn2 : '';

    https.get(address + beer_method +
              encodeURIComponent(namn) +
              client_id + client_secret,

        function(res) {
            res.setEncoding('utf8');
            var str = '';
            res.on('data', (d) => str += d);
            res.on('end', () => {
                beerList[a].bid =
                JSON.parse(str).response.beers.items[0] ?
                JSON.parse(str).response.beers.items[0].beer.bid :
                '';
                console.log(beerList[a].bid);
            });
});

    if (a >= 3) {
        fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));
}
}


