const express = require('express');
const router = express.Router();
const Controller = require('../controller/User_Routes_Controller');
const jwt = require("jsonwebtoken");

const validateAuthentication = function (req, res) {

  // console.log(req.cookies["token"]);
  const token = req.cookies["token"];
  // console.log(token === undefined)

  if(token === undefined) {
    res.send({error: 'Not Found, No valid authentication'});
  }else {
    jwt.verify(token, process.env.SECRET, {
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    subject: 'admin'
    }, (err, decoded) => {
      if(err) {
        console.log(err);
        res.send({error: 'not found, no valid authentication'});
        return;
      }

      // console.log(decoded); returns the payload data
      const controller = new Controller();
      controller.retrieveAll((data) => {
      res.send(data);
      });
    
    });
  }
}

router.get('/api/user', (request, response) => { 
  validateAuthentication(request, response);
});

router.get('/api/user/:id', (request, response) => {
  validateAuthentication(request, response);
});

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

router.post('/api/user/:id', (req) => {
  const controller = new Controller();
  controller.update(req.body, req.params.id);
});

router.delete('/api/user/:id', (req) => {
  const controller = new Controller();
  controller.delete(req.params.id);
});


module.exports = router;