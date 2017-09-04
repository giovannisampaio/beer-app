//jshint esnext: true

var https = require('https');
var fs = require('fs');
var cleanup = require('./JSONCleanup.js');
var fetch = require('node-fetch')

var urls = {
    'products': 'https://www.systembolaget.se/api/assortment/products/xml',
    'stores': 'https://www.systembolaget.se/api/assortment/stores/xml',
    'selection': 'https://www.systembolaget.se/api/assortment/stock/xml',
};

function download(filename, url) {
    https.get(url, function(response) {
        var data = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => data += chunk);
        response.on('end', () => {
            fs.writeFileSync(filename + '.xml', data);
            cleanup[filename]('./' + filename + '.xml', './' + filename + '.json');
                    });
}).on('error', (e) => console.log(e));
}


download('products', urls.products);


