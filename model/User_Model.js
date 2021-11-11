const sql = require("../routes/sql");
const bcrypt = require("bcrypt");
const validator = require('email-validator');

class User {

  username;
  email;
  password;

  constructor(user) {
    this.username = user.username;
    this.email = user.email;
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

  add_user(user, result) {

    let exit = false;

    validate_user(user, (invalid, res) => {
      if(invalid === true) {
        exit = true;
        return result(false, res);
      }
    });

    
    if(exit === false) {
      const queryString = `SELECT email FROM registered where email='${user.email}'`;

      sql.getConnection((err, connection) => {
        if(err) {
          return result(true);
        }else {
          //checking if email is taken
          sql.query(queryString, (err, res) => {
            if(Object.keys(res).length === 0) {
              this.hashing(user.password).then(hashed => {
                const queryString = `INSERT INTO registered (email, password, username) VALUES ('${user.email}', '${hashed}', '${user.username}')`;

                sql.query(queryString, (err) => {
                  if(err) {
                    return result(true);
                  }else {
                    console.log(`user ${user.email} has been registered`);
                    return result(false, 'Account created, you may log in using your credentials.');
                  }
                });
              });                        
            } else {
              return result(false, `${user.email} is taken.`);
            }
          });                
        }
        connection.on('error', () => {
          return result(true);
        });
      });  
    }      
  }

  get_user(userId, result) {
    const queryString = `SELECT * FROM registered where personalid=${userId}`;

    sql.getConnection((err, connection) => {
      if(err) 
        return result(true);
      
      sql.query(queryString, (err, res) => {
        connection.release();
        if(err) 
          return result(true);
        else 
          return result(false, res);        
      });

      connection.on('error', () => {
        return result(true);
      });
    });
  }

  get_all(result) {
    const queryString = `SELECT * FROM registered`;

    sql.getConnection((err, connection) => {
      connection.release();
      if(err) 
        return result(true);
      
      sql.query(queryString, (err, res) => {
        if(err) 
          return result(true);
        else 
          return result(false, res);
      });

      connection.on('error', () => {
        return result(true);
      });
    });
  }

  update_user(user, userId) {
    const queryString = `UPDATE registered SET email='${user.email}', password='${user.password}' where personalid=${userId}`;

    sql.getConnection((err, connection) => {
      if(err) 
        throw err;
    
      sql.query(queryString, (err) => {
        connection.release();
        if(err) 
          throw err; 
        else 
          console.log(`updated user id ${userId} information.`);        
      });

      connection.on('error', (err) => {
        throw err;
      });
    });
  } 

  delete_user(userId) {
    const queryString = `DELETE FROM registered where personalid=${userId}`;

    sql.getConnection((err, connection) => {
      if(err) 
        throw err;
      
      sql.query(queryString, (err) => {
        connection.release();
        if(err) 
          throw err;
        else 
          console.log(`user id ${userId} has been deleted.`);        
      });

      connection.on('error', (err) => {
        throw err;
      });
    });
  } 
}

function validate_user(user, result) {

  for(const key in user) {
    if(user[key].length === 0) {
      return result(true, 'Required fields (*) must be filled in.');
    }
  }

  if(user.username.length < 6 || user.username.length > 12) {
    return result(true, `Username must be between 6 to 12 characters long.`);
  }

  if(validator.validate(user.email) === false) {
    return result(true, `${user.email} is not valid, please enter a valid email address.`);
  }

  if(user.password.length < 6 || user.password.length > 12) {
    return result(true, `Password must be between 6 to 12 characters long.`);
  }
  
  return false;
}

module.exports = User;