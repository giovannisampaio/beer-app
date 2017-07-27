//

window.onload = function () {

    var articles = new XMLHttpRequest();
    var stores = new XMLHttpRequest();
    var sortiment = new XMLHttpRequest();
    var myOptions = {
        attrsAsObject: false,
        textKey: 'key',
        // xmlns: false,
    };

    articles.open('GET', 'untitled.xml', true);
    articles.send();
    stores.open('GET', 'butiker.xml', true);
    stores.send();

    articles.onreadystatechange = function() {
        if(articles.readyState == 4 && articles.status == 200) {
            // Converts the xml to JSON.
            result = xmlToJSON.parseString(articles.response, myOptions);
            // Returns a list of objects representing the articles
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
            result = xmlToJSON.parseString(stores.response, myOptions);
            // Returns a list of objects representing the stores
            var list = result.ButikerOmbud[0].ButikOmbud;
            // Cleaning up the objects to make them easy to use.
            var butiker = list.reduce(function(acc, current) {
                    var butik = {};
                    for (var key in current) {
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
            console.log(JSON.stringify(butiker));
        }
    };

};



// 0 - request not initialiezed
// 1 - request has been set up
// 2 - request has been sent
// 3 - request is in process
// 4 - request is complete