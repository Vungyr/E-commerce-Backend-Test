// Entidad categoria.

class Categorie {

    static schema = {
      type: "object",
        properties: {
          name : {type: "string",errorMessage:'must be of string type'},
          description :{type: "string",errorMessage:'must be of string type'},
          productId : {type: "string",errorMessage:'must be of string type'},
        },
        required: ["name","description"],
        additionalProperties: false,
    }
  
    constructor(id, name, description, productId) {
  
      this.id = id;
      this.name = name;
      this.description = description;
      this.productId = productId;
  
    }
  
  }
  
  module.exports = Categorie;