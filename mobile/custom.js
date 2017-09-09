"use strict";
$( document ).ready(function() {
    $(".dropdown-button").dropdown();
    
    $.ajax("http://localhost:8000/api/beers").done(function(data, status, jqXhr) {
    	alert("AJAX call completed successfully!");
    	console.log("Request status: " + status);
    	console.log("Data returned from server:");
    	console.log(data);
	});
});
