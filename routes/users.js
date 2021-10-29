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
    res.status(400).send(data);
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