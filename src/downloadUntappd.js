//jshint esnext: true

require('dotenv').config();
var request = require('request');
var https = require('https');
var beerList = require('./products5.json');
var fs = require('fs');

var client_id = '&client_id=' + process.env.CLIENT_ID;
var client_secret = '&client_secret=' + process.env.CLIENT_SECRET;
var token = '?access_token=' + process.env.TOKEN;
var address = 'https://api.untappd.com/v4/';
var bid_search = 'search/beer?q=';
var info_search = 'beer/info/';
var counter = 0;
var noBID = [];
var noInfo = [];


function getName(beer) {
    var Namn2 = !beer.Namn2 ?
                '' :
                beer.Namn2.split(' ');
    return beer.bid ?
           false :
           !Namn2 ?
           beer.Namn :
           Namn2.length > 2 ?
           beer.Namn + ' ' + Namn2[0] + ' ' + Namn2[1] :
           beer.Namn + ' ' + Namn2.join(' ');
}

function getUnspecificName(beer) {
    return beer.Namn;
}

function getSpecificName(beer) {
    var producent = beer.Producent.split(' ');
    return producent[0] + ' ' + beer.Namn;
}

function getInfo(bid, name) {
    return new Promise(resolve =>  {
        if (bid) {
        https.get(
            address + info_search +
            bid + token + '&compact=true',

            res => {
                res.setEncoding('utf8');
                var str = '';
                counter++;
                res.on('data', (d) => str += d);
                res.on('end', () => {
                    if (JSON.parse(str).response.beer) {
                        resolve(JSON.parse(str).response.beer);
                    }
                    else  {
                        noInfo.push(name);
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

function getBID(name, cur) {
    return new Promise(resolve =>  {
        if (name) {
        https.get(
            address + bid_search +
            encodeURIComponent(name) +
            client_id + client_secret,

            res => {
                res.setEncoding('utf8');
                var str = '';
                counter++;
                res.on('data', (d) => str += d);
                res.on('end', () => {
                    var bid = validate(JSON.parse(str).response, cur);
                    if (bid) {
                        resolve(bid);
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

// "Alkoholhalt": "9.50%",
// parseFloat('9.50%').toString()

function validate(data, cur) {
    if (data.found === 0) {
        return getBID(getUnspecificName(cur));
    }
    if (data.found > 10) {
        return getBID(getSpecificName(cur));
    }
    if (data.beers.items[0].beer_abv ===
        parseFloat(cur.Alkoholhalt).toString()) {
            return data.beers.items.beer[0].bid;
    }
    else {
        return false;
    }
}

function updateBID(bid, num, arr) {
    return new Promise(resolve =>  {
        if (bid) {
            resolve(arr[num].bid = bid);
    }
        resolve();
});
}

function updateInfo(info, num, arr) {
    return new Promise(resolve => {
        if(info) {
            resolve(arr[num].info = info);
        }
        resolve();
    });
}

function timer(func, cur, ind, arr1) {
    return new Promise(resolve =>
        setTimeout(() => {
            resolve(func(cur, ind, arr1));
        }, (counter % 99 === 0) && (counter > 0) ? 60*60*1000 : 0)
        );
}

function resolver(cur, ind, arr1) {
    var name = getName(cur);
    return getBID(name, cur)
    .then((BID) => updateBID(BID, ind, arr1))
    .then((BID) => getInfo(BID, name)
    .then((info1) =>  updateInfo(info1, ind, arr1)));
}

var iterate = (cur, ind, arr1) => {
    return timer(resolver, cur, ind, arr1);
};


var ready = beerList.map(iterate);
var results = Promise.all(ready);
results.then(() => {
    fs.writeFile('./products4.json', JSON.stringify(beerList, null, 4));
    fs.writeFile('./noBID.json', JSON.stringify(noBID, null, 4));
    fs.writeFile('./noInfo.json', JSON.stringify(noInfo, null, 4));
});