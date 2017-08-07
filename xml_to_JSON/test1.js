// jshint esnext: true
// jshint browser: true


window.onload = function () {
    'use strict';
    var products = new XMLHttpRequest();
    var stores = new XMLHttpRequest();
    var selection = new XMLHttpRequest();
    var myOptions = {
        attrsAsObject: false,
        textKey: 'key',
        // xmlns: false,
    };

    products.open('GET', 'untitled.xml', true);
    products.send();
    stores.open('GET', 'butiker.xml', true);
    stores.send();
    selection.open('GET', 'selection.xml', true);
    selection.send();

    products.onreadystatechange = function() {
        if(products.readyState == 4 && products.status == 200) {
            // Converts the xml to JSON.
            var result = xmlToJSON.parseString(products.response, myOptions);
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
        }
    };

    stores.onreadystatechange = function() {
        if(stores.readyState == 4 && stores.status == 200) {
            // Converts the xml to JSON.
            var result = xmlToJSON.parseString(stores.response, myOptions);
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
        }
    };

    selection.onreadystatechange = function() {
        if(selection.readyState == 4 && selection.status == 200) {
             // Converts the xml to JSON.
            var result = xmlToJSON.parseString(selection.response, myOptions);
            // Returns a list of objects representing the selection
            var list = result.ButikArtikel[0].Butik;
            // Returns an object with the store numbers as keys and the list of
            // products as an array.
            var butiker = list.reduce(function(acc, current) {
                acc[current._attrButikNr._value] = current.ArtikelNr.
                    reduce((a, b) => a.concat(b.key), []);
                return acc;
                }, {});
            console.log(JSON.stringify(butiker, null, 4));
        }
    };

};



// 0 - request not initialiezed
// 1 - request has been set up
// 2 - request has been sent
// 3 - request is in process
// 4 - request is complete