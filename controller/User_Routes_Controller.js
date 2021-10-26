const User = require('../model/User_Model');

class Controller {
  //where the CRUD methods are implemented

  constructor() {

  }

  //create
  create(req) {
    const user = new User({
      email: req.email, 
      password: req.password
    });
    user.add_user(user);    
  }

  //retreiveAll
  retrieveAll(result) {

    const user = new User({
      email: null,
      password: null
    });

    user.get_allUsers((err, res) => {
      if(err) {
        console.log("error in retrieving users");
      }else {
        result(res);
      }
    });
  }

  //retrieve

  //update

  //delete

}

module.exports = Controller;