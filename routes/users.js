var express = require('express');
var router = express.Router();
const Controller = require('../controller/User_Routes_Controller');


router.get('/api/user', (req, res) => {
  const controller = new Controller();
  controller.retrieveAll((data) => {
      res.send(data);
  });
});

router.get('/api/user/register/:id', (req, res) => {

})

router.post('/api/user', (req, res) => {
  const controller = new Controller();
  controller.create({
    email: req.body.email,
    password: req.body.password
  });

  res.send(req.body);
});

module.exports = router;