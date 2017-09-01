//jshint esnext: true

require('dotenv').config();
var request = require('request');
var https = require('https');
var beerList = require('./products.json');
var fs = require('fs');

var client_id = '&client_id=' + process.env.CLIENT_ID;
var client_secret = '&client_secret=' + process.env.CLIENT_SECRET;
var token = '?access_token=' + process.env.TOKEN;
var address = 'https://api.untappd.com/v4/';
var beer_method = 'search/beer?q=';



function getName(num) {
    if(beerList[num].bid) {
        return false;
    }
    return beerList[num].Namn +
           (beerList[num].Namn2 ?
           ' ' + beerList[num].Namn2 :
           '');
}

function getBID(name) {
    return new Promise(function(resolve, reject) {
        if (name) {
        https.get(
            address + beer_method +
            encodeURIComponent(name) +
            client_id + client_secret,

            function(res) {
                res.setEncoding('utf8');
                var str = '';
                res.on('data', (d) => str += d);
                res.on('end', () => {
                    JSON.parse(str).response.beers.items[0] ?
                    resolve(JSON.parse(str).response.beers.items[0].beer.bid) :
                    resolve(false);
                });
            });
    }
    else {
        resolve(false);
    }
    });
}

function updateJSON(bid, num) {
    return new Promise(function(resolve, reject) {
        if (bid) {
            beerList[num].bid = bid;
            if (beerList[num].bid == bid) {
                resolve();
            }
    }
});
}

// getBID(getName(0))
// .then((x) => updateJSON(x, 0))
// .then(() => {fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));});


function iterate(num) {
    return new Promise(function(resolve, reject) {
        for (var i = 0; i < num; i++) {
            getBID(getName(i)).then((x) => updateJSON(x, i).then(() => {i === (num - 1) ? resolve() : false}));
        }
    });
}
iterate(4).then(() => {fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));});
// getBID(getName(0)).then((x) => updateJSON(x, 0)).then(fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4)));
// getBID(getName(0)).then(console.log);
// function jiterate() {

// }

// https.get(address + beer_method + bid + client_id + client_secret, function(res) {
//         res.setEncoding('utf8');
//         var str = '';
//         res.on('data', (d) => str += d);
//         res.on('end', () => console.log(JSON.parse(str).response.beers.items[0].beer.bid));});
// Object.keys(beerList).forEach(function(a) {
// for (var a = 0; a < 4; a++) {

//     if(beerList[a].bid) return;
//     var namn = beerList[a].Namn;
//     namn += beerList[a].Namn2 ? ' ' + beerList[a].Namn2 : '';

//     https.get(address + beer_method +
//               encodeURIComponent(namn) +
//               client_id + client_secret,

//         function(res) {
//             res.setEncoding('utf8');
//             var str = '';
//             res.on('data', (d) => str += d);
//             res.on('end', () => {
//                 beerList[a].bid =
//                 JSON.parse(str).response.beers.items[0] ?
//                 JSON.parse(str).response.beers.items[0].beer.bid :
//                 '';
//             });
// });

//     if (a >= 3) {
        // fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));
// }
// }
// function update(num) {
//     for (var a = 0; a < num; a++) {
//         if(beerList[a].bid) return;
//         var namn = beerList[a].Namn;
//         namn += beerList[a].Namn2 ? ' ' + beerList[a].Namn2 : '';

//         https.get(address + beer_method +
//               encodeURIComponent(namn) +
//               client_id + client_secret,

//         function(res) {
//             res.setEncoding('utf8');
//             var str = '';
//             res.on('data', (d) => str += d);
//             res.on('end', () => {
//                 beerList[a].bid =
//                 JSON.parse(str).response.beers.items[0] ?
//                 JSON.parse(str).response.beers.items[0].beer.bid :
//                 '';
//             });
//     });
// }
// }