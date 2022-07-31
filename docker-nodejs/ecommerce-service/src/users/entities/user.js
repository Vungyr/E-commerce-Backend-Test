// Entidad usuario.

class User {

    static schema = {
      type: "object",
        properties: {
          name : {type: "string",errorMessage:'must be of string type'},
          email :{type: "email",errorMessage:'must be of email type'},
          password :{type: "password",errorMessage:'must be of password type'},
        },
        required: ["name","email","password"],
        additionalProperties: false,
    }
  
    constructor(id, name, email, password) {
  
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
  
    }
  
  }
  
  module.exports = User;