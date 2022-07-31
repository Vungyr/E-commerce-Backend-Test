// Entidad transaccion.

class Transaction {

    static schema = {
      type: "object",
        properties: {
          userId : {type: "integer",errorMessage:'must be of integer type'},
          productId :{type: "integer",errorMessage:'must be of integer type'},
        },
        required: ["userId","productId"],
        additionalProperties: false,
    }
  
    constructor(id, userId, productId) {
  
      this.id = id;
      this.userId = userId;
      this.productId = productId;
  
    }
  
  }
  
  module.exports = Transaction;