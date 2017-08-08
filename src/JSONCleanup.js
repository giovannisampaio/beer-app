// jshint esnext: true

var fs = require('fs');
var xmlToJSON = require('./xmlToJSON.js');

var myOptions = {
        attrsAsObject: false,
        textKey: 'key',
        // xmlns: false,
    };

module.exports = {

products: function(input, output) {
    fs.readFile(input, 'utf8', function(err, products) {
    // Converts the xml to JSON.
    if (err) return console.log(err);
    var result = xmlToJSON.parseString(products, myOptions);
    // Returns a list of objects representing the products
    var list = result.artiklar[0].artikel;
    // Returns a list of only the beer in the selection. The objects
    // are cleaned up to be easy to use.
    var beer = list.filter(a => a.Varugrupp[0].key == 'Öl')
        .reduce(function(acc, current) {
            var article = {};
            for (var key in current) {
                // Replaces every [null] value with '' and
                // makes the other values a string.
                article[key] = typeof current[key][0].key ==
                'object' ? '' : current[key][0].key;
            }
            return acc.concat(article);
        }, []);
    fs.writeFile(output, JSON.stringify(beer, null, 4));
});

},

stores: function(input, output) {
    fs.readFile(input, 'utf8', function(err, stores) {
        if (err) return console.log(err);
        // Converts the xml to JSON.
        var result = xmlToJSON.parseString(stores, myOptions);
        // Returns a list of objects representing the stores
        var list = result.ButikerOmbud[0].ButikOmbud;
        // Cleaning up the objects to make them easy to use.
        var butiker = list.reduce(function(acc, current) {
                var butik = {};
                for (var key in current) {
                    // Removes every _attrtype.
                    if (key == '_attrtype') {
                        continue;
                    }
                    // Replaces every [null] value with '' and
                    // makes the other values a string.
                    butik[key] = typeof current[key][0].key ==
                    'object' ? '' : current[key][0].key;
                }
                return acc.concat(butik);
            }, []);
        fs.writeFile(output, JSON.stringify(stores, null, 4));
        });
    },
selection: function(input, output) {
        fs.readFile(input, 'utf8', function(err, selection) {
            if (err) return console.log(err);
             // Converts the xml to JSON.
            var result = xmlToJSON.parseString(selection, myOptions);
            // Returns a list of objects representing the selection
            var list = result.ButikArtikel[0].Butik;
            // Returns an object with the store numbers as keys and the list of
            // products as an array.
            var utbud = list.reduce(function(acc, current) {
                acc[current._attrButikNr._value] = current.ArtikelNr.
                    reduce((a, b) => a.concat(b.key), []);
                return acc;
                }, {});
            fs.writeFile(output, JSON.stringify(utbud, null, 4));
        });
    }

};