	const express = require ('express');
	const logger = require('morgan');
	const bodyParser = require('body-parser');
	const path = require('path');

	//Set up the express app
    const app = express();

	//Log requests to the console
	app.use(logger('dev'));

	//Parse incoming requests data 
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(express.static('public'));

    //Require our routes into the application
    require('./server/routes')(app);
    
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
    });
	//Setup a default catch-all route that sends a welcome message in JSON format
	app.get('*', (req,res) => res.status(200).send({
		message: 'Looking good!'
	}));

	module.exports = app;
