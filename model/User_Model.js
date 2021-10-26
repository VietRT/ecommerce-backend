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

  //get (get)
  // get_user(id, result) {

  // }

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

  //add (post)
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

  //update (post)

  //delete (delete)

}

module.exports = User;