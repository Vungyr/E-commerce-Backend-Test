// Entidad producto.

class Product {

    static schema = {
      type: "object",
        properties: {
          name : {type: "string",errorMessage:'must be of string type'},
          description :{type: "string",errorMessage:'must be of string type'},
          quantity : {type: "integer",errorMessage:'must be of integer type'},
          status : {type: "boolean",errorMessage:'must be of boolean type'},
          CategorieId: {type: "integer",errorMessage:'must be of integer type'},
          UserId: {type: "integer",errorMessage:'must be of integer type'},
        },
        required: ["name","description","quantity","status","CategorieId"],
        additionalProperties: false,
    }
  
    constructor(id, name, description, quantity, status, CategorieId, UserId) {
  
      this.id = id;
      this.name = name;
      this.description = description;
      this.quantity = quantity;
      this.status = status;
      this.CategorieId = CategorieId;
      this.UserId = UserId;
  
    }
  
  }
  
  module.exports = Product;