//jshint esnext: true

require('dotenv').config();
var request = require('request');
var https = require('https');
var beerList = require('./products3.json');
var fs = require('fs');

var client_id = '&client_id=' + process.env.CLIENT_ID;
var client_secret = '&client_secret=' + process.env.CLIENT_SECRET;
var token = '?access_token=' + process.env.TOKEN;
var address = 'https://api.untappd.com/v4/';
var beer_method = 'search/beer?q=';
var counter = 0;
var noBID = [];


function getName(num, arr) {
    var Namn2 = !arr[num].Namn2 ?
                '' :
                arr[num].Namn2.split(' ');
    return arr[num].bid ?
           false :
           !Namn2 ?
           arr[num].Namn :
           Namn2.length > 2 ?
           arr[num].Namn + ' ' + Namn2[0] + ' ' + Namn2[1] :
           arr[num].Namn + ' ' + Namn2.join(' ');
}

function updateBID(name) {
    return new Promise(resolve =>  {
        if (name) {
        https.get(
            address + beer_method +
            encodeURIComponent(name) +
            client_id + client_secret,

            res => {
                res.setEncoding('utf8');
                var str = '';
                counter++;
                res.on('data', (d) => str += d);
                res.on('end', () => {
                    if (JSON.parse(str).response.beers.items[0]) {
                        resolve(JSON.parse(str).response.beers.items[0].beer.bid);
                    }
                    else  {
                        noBID.push(name);
                        resolve();
                    }
                });
            });
    }
    else {
        resolve();
    }
    });
}

function updateJSON(bid, num, arr) {
    return new Promise(resolve =>  {
        if (bid) {
            resolve(arr[num].bid = bid);
    }
        resolve();
});
}

var iterate = (cur, ind, arr1) => {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(updateBID(getName(ind, arr1))
            .then((x) => updateJSON(x, ind, arr1)));
    }, (counter % 100 == 1) && (counter > 1) ? 60*60*1000 : 0));};

var ready = beerList.map(iterate);
var results = Promise.all(ready);
results.then(() => {fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));
    console.log(JSON.stringify(noBID));
});
// beerList.map((cur, ind, arr1) => {
//     setTimeout(() => {
//         updateBID(getName(ind, arr1))
//         .then((x) => updateJSON(x, ind, arr1));
//     }, ind % 100 == 1? 60*60*1000 : 0);
// }).then(() => {fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));});
// updateBID(getName(0))
// .then((x) => updateJSON(x, 0))
// .then(() => {fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));});


// function iterate(num) {
//     return new Promise(function(resolve, reject) {
//         for (var i = 0; i < num; i++) {
//             updateBID(getName(i)).then((x) => updateJSON(x, i).then(() => {i === (num - 1) ? resolve() : false}));
//             console.log(i);
//         }
//     });
// }
// iterate(4).then(() => {fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4));});
// updateBID(getName(0)).then((x) => updateJSON(x, 0)).then(fs.writeFile('./products2.json', JSON.stringify(beerList, null, 4)));
// updateBID(getName(0)).then(console.log);
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