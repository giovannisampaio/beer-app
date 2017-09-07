const beer = require('../models').beer;

module.exports = {
  list(req, res){ 
    return beer
      .all()
      .then(beers => res.status(201).send(beers))
      .catch(error => res.status(400).send(error));
  },
};