"use strict";
$( document ).ready(function() {
    $(".dropdown-button").dropdown();
    
    $.ajax("http://localhost:8000/api/beers").done(function(data, status, jqXhr) {
            
    		data.forEach(function(beer) {
    			var card = '<div class="row"><div class="col s12 center"><div class="card horizontal"><div class="card-image"><img src="img/beer_2360.jpg"></div><div class="card-content"><div class="card-title"><p><b> ' + beer.Namn + '</b></p></div><p><b>Brewery:</b> ' + beer.Producent + '</br><p><b>Style:</b> ' +  beer.Namn + '</p><p>' + beer.Ursprunglandnamn + '</p><p>Alcohol: ' + beer.Alkoholhalt + '</p><p>Volume: ' + beer.Volymiml  + 'ml</p></div></div></div></div>';
    			$(".beers").append(card);
    		});
	});
});
