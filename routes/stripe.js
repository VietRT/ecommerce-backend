const express = require('express');
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const items_list = require('../public/javascripts/items_list');

router.post('/v1/payment-intents', async(req, res) => {

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    res.status(200).send(paymentIntent);
  }catch(err){
    res.status(500).send(err.message);
  }

});

router.post('/create-stripe-session', async (req, res) => {

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
              name: store_item.title.concat(', size(', item.size, ')')
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