const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const items_list = require('../public/javascripts/items_list');

router.post('/v1/payments/intents', async(req, res) => {

})

router.post('/create-stripe-session', async (req, res) => {

  // req.body.map(item => {
  //   let store_item = {};

  //   items_list.forEach(server_item => {
  //     if(server_item.id === item.id) {
  //       store_item = server_item;
  //     }
  //   });
  //   console.log(store_item);
  // });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.map(item => {

        let store_item = {};

        items_list.forEach(server_item => {
          if(server_item.id === item.id) {
            store_item = server_item;
          }
        });

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: store_item.title
            },
            unit_amount: store_item.price,
          },
          quantity: item.quantity
        }      
      }),
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.ERROR_URL
      
    });

    res.send({id: session.id, url: session.url});
  }catch(err) {
    res.status(500).send(err.message);
  }
  
});

module.exports = router;