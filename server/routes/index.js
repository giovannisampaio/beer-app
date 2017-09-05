const beersController = require('../controllers').beers;

module.exports = (app) => {
  app.get('/api', (req,res) => res.status(200).send({
    message: 'Welcome to the Beer API!',
  }));

  app.get('/api/beers', beersController.list);
};
