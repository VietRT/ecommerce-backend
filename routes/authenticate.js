const express = require('express');
const router = express.Router();
const sql = require("../routes/sql");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const path = require('path');


try {
  require('dotenv').config({path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)});
}catch(err) {
  //dotenv file will not be used in production
}

router.post('/login/user/auth', (req, res) => {

  const queryString = `SELECT email, password, username from registered WHERE email='${req.body.email}'`;
  
  sql.getConnection((err, connection) => {
    if(err) 
      console.log('error in getting sql connection ', err.message);
    
      connection.release(); 

    
      sql.query(queryString, async (err, result) => {
        if(err) 
          console.log('error in querying user credentials ', err.message);

        if(result.length === 0) {
          return res.status(400).send('Could not locate any credentials on record.');
        }

        // bcrypt.compare(req.body.password, result[0].password)
        // .then(result => res.send(result));

        const comparison = await bcrypt.compare(req.body.password, result[0].password);

        if (comparison === false) {
          return res.status(400).send('Incorrect login credentials. Please try again,');
        }else {
          jwt.sign({
            // email: req.body.email,
            // user: result[0].username
            email:  await bcrypt.hash(req.body.email, 10),
            user: await bcrypt.hash(result[0].username, 10)
          },
          process.env.SECRET, 
          {
            expiresIn: '300s'
          }, (err, token) => {
            if(err) {
              console.log('error jwt token creation ', err);
            }

            res.cookie('token', token, {
              expires: new Date(Date.now() + (30 * 60 * 1000)),
              // expires: new Date(Date.now() + (30 * 1000)),
              httpOnly: true,
              secure: true,
              sameSite: 'lax',
              path: '/'
            });
            res.status(200).send(result[0].username);
          });
        }
    
        // bcrypt.compare(req.body.password, result[0].password, async (err, conclusion) => 
        // {
        //   if(err) 
        //     console.log('error in password comparison ', err);
          
        //   if(!conclusion) {
        //     return res.status(400).send('Incorrect login credentials. Please try again,');

        //   }else {

        //     jwt.sign({
        //       // email: req.body.email,
        //       // user: result[0].username
        //       email:  await bcrypt.hash(req.body.email, 10),
        //       user: await bcrypt.hash(result[0].username, 10)
        //     },
        //     process.env.SECRET, 
        //     {
        //       expiresIn: '300s'
        //     }, (err, token) => {
        //       if(err) {
        //         console.log('error jwt token creation ', err);
        //       }

        //       res.cookie('token', token, {
        //         expires: new Date(Date.now() + (30 * 60 * 1000)),
        //         // expires: new Date(Date.now() + (30 * 1000)),
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'lax',
        //         path: '/'
        //       });
        //       res.status(200).send(result[0].username);
        //     });
        //   }   
        // });
      });
  });
});


module.exports = router;