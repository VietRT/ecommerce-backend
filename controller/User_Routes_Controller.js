const User = require('../model/User_Model');

class Controller {
  //where the CRUD methods are implemented

  constructor() {

  }

  //create
  create(req, result) {
    const user = new User({
      username: req.username,
      email: req.email, 
      password: req.password
    });

    user.add_user(user, (err, res) => {
      if(err) {
        console.log('error in creating new user');
      }else {
        return result(res);
      }      
    });
       
  }

  //retrieve
  retrieve(userId, result) {
    const user = new User({
      username: null,
      email: null,
      password: null
    });

    user.get_user(userId, (err, res) => {
      if(err) {
        console.log("error in retrieving");
      }else {
        return result(res);
      }
    })
  }

  //retreiveAll
  retrieveAll(result) {
    const user = new User({
      username: null,
      email: null,
      password: null
    });

    user.get_allUsers((err, res) => {
      if(err) {
        console.log("error in retrieving users");
      }else {
        return result(res);
      }

    });
  }

  //update
  update(req, userId) {
    const user = new User({
      username: req.username,
      email: req.email,
      password: req.password
    });

    user.update_user(req, userId);
  }

  //delete
  delete(userId) {
    const user = new User({
      username: null,
      email: null,
      password: null
    });

    user.delete_user(userId);
  }

}

module.exports = Controller;