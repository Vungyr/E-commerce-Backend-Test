// Entidad Auth.

class Auth {

    static schema = {
      type: "object",
        properties: {
          name : {type: "string",errorMessage:'must be of string type'},
          email : {type: "string", format:"email", errorMessage:'must be of email type'},
          password : {type: "string",errorMessage:'must be of string type'},
          is_admin: {type: "boolean",errorMessage:'must be of boolean type'},
        },
        required: ["email","password"],
        additionalProperties: false,
    }
  
    constructor(id, email, password, name, is_admin) {
  
      this.id = id;
      this.email = email;
      this.password = password;
      this.name = name;
      this.is_admin = is_admin;
  
    }
  
  }
  
  module.exports = Auth;