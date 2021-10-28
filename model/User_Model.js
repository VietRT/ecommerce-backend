const sql = require("../routes/sql");
const bcrypt = require("bcrypt");

class User {

  email;
  password;

  constructor(user) {
    this.email = user.email;
    // this.password = this.hashing(user.password);
    this.password = user.password;
  }

 async hashing(password) {

    return bcrypt.genSalt(10)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hashed => {
      return hashed;
    })
    .catch(err => {
      throw err;
    })
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
  add_user(user, result) {

    const queryString = `SELECT email FROM registered where email='${user.email}'`;

    sql.query(queryString, (err, res) => {
      if(err) {
        throw err;
      }else {
        if(Object.keys(res).length === 0) {
          this.hashing(user.password).then(hashed => {
            const queryString = `INSERT INTO registered (email, password) VALUES ('${user.email}', '${hashed}')`;
      
              sql.query(queryString, (err) => {
                if(err) {
                  console.log(err.message);
                }else {
                  console.log(`user ${user.email} has been registered`);
                }
              });
          });
          result(null,'email registered!');
        }else {
          result(null, `${user.email} is taken`);
        }    
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