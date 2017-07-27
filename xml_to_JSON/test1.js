//

window.onload = function () {

    var http = new XMLHttpRequest();
    var myOptions = {
        attrsAsObject: false,
        textKey: 'key',
        // xmlns: false,
    };

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            // Converts the xml to JSON.
            result = xmlToJSON.parseString(http.response, myOptions);
            // Returns a list of objects representing the articles
            var list = result.artiklar[0].artikel;
            // Returns a list of only the beer in the selection. The objects
            // are cleaned up to be easy to use.
            var beer = list.filter(a => a.Varugrupp[0].key == "Öl")
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
    http.open("GET", "untitled.xml", true);
    http.send();

};

// 0 - request not initialiezed
// 1 - request has been set up
// 2 - request has been sent
// 3 - request is in process
// 4 - request is complete