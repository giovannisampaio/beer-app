//jshint esnext: true

var https = require('https');
var fs = require('fs');

const PRODUCTS = 'https://www.systembolaget.se/api/assortment/products/xml';

https.get(PRODUCTS, function(response) {
    var data = '';
    response.setEncoding('utf8');
    response.on('data', (chunk) => {data += chunk;} );
    response.on('end', () => fs.writeFile('products.xml', data));
}).on('error', (e) => console.log(e));