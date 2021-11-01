var express = require('express');
var router = express.Router();
const Controller = require('../controller/User_Routes_Controller');

router.get('/api/user', (req, res) => {
  const controller = new Controller();
  controller.retrieveAll((data) => {
    res.send(data);
  });
});

router.get('/api/user/:id', (req, res) => {
  const controller = new Controller();
  controller.retrieve(req.params.id, (data) => {
    res.send(data);
  })
})

router.post('/api/user', (req, res) => {

  const controller = new Controller();
  
  controller.create(req.body, (data) => {
    console.log(data);
    if(data === 'Required fields (*) must be filled in.') {
      res.status(400).send(data);
    }else if(data === `Username must be between 6 to 12 characters long.`) {
      res.status(400).send(data);
    }else if (data === `${req.body.email} is not valid, please enter a valid email address.`) {
      res.status(400).send(data);
    }else if(data === `Password must be between 6 to 12 characters long.`) {
      res.status(400).send(data);
    }
    else if( data === `${req.body.email} is taken.`) {
      res.status(400).send(data);
    }else {
      res.send(data);
    }
  });

});

router.post('/api/user/:id', (req, res) => {
  const controller = new Controller();

  controller.update(req.body, req.params.id);
});

router.delete('/api/user/:id', (req, res) => {
  const controller = new Controller();
  console.log('delete method');
  console.log(req.params.id);
  controller.delete(req.params.id);
});


module.exports = router;