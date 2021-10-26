const sql = require("../routes/sql");

class User {

  email;
  password;

  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  test() {
    console.log("user class");
    console.log(this.email);
    console.log(this.password);
  }

  //get 
  get_user(userId, result) {
    const queryString = `SELECT * FROM registered where personalid=${userId}`;

    sql.query(queryString, (err, res) => {
      if(err) {
        throw err;
      }else {
        return result(null, res);
      }
    })
  }

  //getall
  get_allUsers(result) {
    const queryString = `SELECT * FROM registered`;

    sql.query(queryString, (err, res) => {
      if(err) {
        throw err;
      }else {
        return result(null, res);
      }

    });

  }

  //add
  add_user(user) {
    const queryString = `INSERT INTO registered (email, password) VALUES ('${user.email}', '${user.password}')`;
    console.log(typeof user);
     sql.query(queryString, (err) => {
      if(err) {
        console.log(err.message);
      }else {
        console.log(`user ${user.email} has been registered`);
      }
    });
  }

  //update
  update_user(user, userId) {
    const queryString = `UPDATE registered SET email='${user.email}', password='${user.password}' where personalid=${userId}`;

    sql.query(queryString, (err, res) => {
      if(err) {
        throw err;
      }else {
        console.log(`updated user id ${userId} information`);
      }
    })
  } 

  //delete
  delete_user(userId) {
    const queryString = `DELETE FROM registered where personalid=${userId}`;

    sql.query(queryString, (err, res) => {
      if(err) {
        throw err;
      }else {
        console.log(`user id ${userId} has been deleted`);
      }
    });
  }
  

}

module.exports = User;