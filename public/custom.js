"use strict";
$( document ).ready(function() {
    $(".dropdown-button").dropdown();
    
    $.ajax("http://localhost:8000/api/beers").done(function(data, status, jqXhr) {
    	data.forEach(function(beer) {
    		var rating = beer.rating_score;
    		var card = '<div class="row "><div class="col s12 center"><div class="card horizontal"><div class="card-image"><img src=' + beer.beer_label + '></div><div class="card-content"><div class="card-title"><p> ' + beer.beer_name + '</p></div><p><b>Brewery:</b>' + beer.brewery.brewery_name + '</br><p><b>Style:</b> ' + beer.beer_style + '</p><p>' + beer.brewery.country_name + '</p><p>Volume: ' + beer.Volymiml + 'ml<p>Alcohol Vol.: ' + beer.Alkoholhalt + '</p><p> Rating: ' + rating + '</p></div></div></div></div>' ;
			$(".beers").append(card);
		});
	});

	
});
