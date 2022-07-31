const { DataTypes, Association } = require('sequelize');

// Implementación con Sequelize para el repositorio de transacciones.
// Recibe la conexión con Sequelize externamente.

class SequelizeTransactionsRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
    // Mapear la tabla Transactions.
    // Si "test" es true, se le agrega un sufijo al nombre de la tabla,
    // para que las pruebas de integración no sobreescriban los datos existentes.

    let tableName = "Transaction";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    const Transaction = sequelizeClient.sequelize.define('Transaction', columns, options);

    // Associations
    Transaction.associate = function(models) {
      Transaction.belongsTo(models.User);
      Transaction.belongsToMany(models.Product,{
          through: "product_transaction",
          as:"productTransaction"
        })
    }

    this.transactionModel = Transaction;

  }

  async getTransactions() {

    const productModel = this.sequelizeClient.sequelize.model("Product");
    const userModel = this.sequelizeClient.sequelize.model("User");

    const transactions = await this.transactionModel.findAll({
      include:[
        {
          model: productModel,
          as:"product-transaction",
          attribute:["id", "name", "description","quantity","status"]
        },
        {
          model: userModel,
          as: "User",
          attributes:["id", "name", "email","is_admin"]
        }
      ]  
    });    

    return transactions;

  }

  async getTransactionsBuyers() {

    const transactionsBuyers = await this.transactionModel.findAll({
      include:[
        {
          association: "User",
          attributes:["id", "name", "email", "is_admin"],
        },
        { 
          association: "productTransaction",
        }
      ]
    });    

    let transactions = transactionsBuyers;
    transactions.forEach((Buyer, i) => {
      if(Buyer.User === null){
        const { [i]: removedProperty, ...output } = transactions;
        transactions = output;
      }
    })

    return transactions;
  }

  async getTransactionsSellers() {

    const userModel = this.sequelizeClient.sequelize.model("User");

    const users = await userModel.findAll({
      include:{
        association: "Products",
      },
      attributes:["id"]
    });

    let sellersIds = []
    users.forEach((Seller, i) => {
      if(Seller.Products.length !== 0){
        sellersIds[i] = Seller.id; 
      }
    });

    const transactions = await this.transactionModel.findAll({
      include:[
        {
          association: "User",
          attributes:["id", "name", "email", "is_admin"],
          where:{ id: sellersIds}
        },
        { 
          association: "productTransaction",
        }
      ]  
    });    

    return transactions;
  }

  async getTransaction(id) {

    const productModel = this.sequelizeClient.sequelize.model("Product");
    const userModel = this.sequelizeClient.sequelize.model("User");

    return await this.transactionModel.findByPk(id,{
      include:[
        {
          model: productModel,
          as:"product-transaction",
          attribute:["id", "name", "description","quantity","status"]
        },
        {
          model: userModel,
          as: "User",
          attributes:["id", "name", "email","is_admin"]
        }
      ]
    });

  }

  async createTransaction(transaction) {

    const dataTransaction = await this.transactionModel.create({UserId: transaction.userId});

    const productModel = this.sequelizeClient.sequelize.model("Product");
    const dataProduct = await productModel.findByPk(transaction.productId);
    if (!dataProduct){
        return dataProduct;
    }

    if(dataProduct.status === false){
      return {msg:"Out of stock."}
    } else{

      const updateProduct = {quantity: dataProduct.quantity - 1}
      if (updateProduct.quantity === 0 ){
        updateProduct.status = false
      }

      const options = {
        where: {
          id: dataProduct.id,
        }
      };
      await productModel.update(updateProduct, options)
    }
    
    await dataTransaction.addProductTransaction(dataProduct);
    return dataTransaction.id;
  }

  async deleteTransaction(id) {
    
    const productTransactionModel = this.sequelizeClient.sequelize.model("product_transaction");
    const trasactionProductId =  await productTransactionModel.findOne({where:{TransactionId: parseInt(id)}})

    const productModel = this.sequelizeClient.sequelize.model("Product");
    const dataProduct = await productModel.findByPk(trasactionProductId.ProductId);
    if (!dataProduct){
        return dataProduct;
    }
    const updateProduct = {quantity: dataProduct.quantity + 1}
    
    if(dataProduct.quantity === 0){updateProduct.status = true} 
    
    const options = {
      where: {
        id: dataProduct.id,
      }
    };
    await productModel.update(updateProduct, options)
   
    const optionsDeleteTrans = {
      where: {
        id: id,
      }
    };

    await this.transactionModel.destroy(optionsDeleteTrans);

  }


}

module.exports = SequelizeTransactionsRepository;