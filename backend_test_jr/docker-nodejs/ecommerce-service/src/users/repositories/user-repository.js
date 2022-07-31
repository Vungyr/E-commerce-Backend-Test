const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de users.
// Recibe la conexión con Sequelize externamente.

class SequelizeUsersRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
    // Mapear la tabla Users.
    // Si "test" es true, se le agrega un sufijo al nombre de la tabla,
    // para que las pruebas de integración no sobreescriban los datos existentes.

    let tableName = "User";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name:{ 
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "name",
      },
      email:{ 
        type: DataTypes.STRING(80),
        allowNull: false,
        field: "email",
      },
      password:{ 
        type: DataTypes.STRING(300),
        allowNull: false,
        field: "password",
      },
      is_admin:{ 
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        field: "is_admin",
      },

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    const User = sequelizeClient.sequelize.define('User', columns, options);

    // Associations
    User.associate = function(models) {
      User.hasMany(models.Transaction,
          {foreignKey: "UserId"}  
        );
      
      User.hasMany(models.Product,
         {foreignKey: "UserId"} 
        );
    }

    this.userModel = User;

  }

  async getUsersBuyers(){

    const usersBuyers = await this.userModel.findAll({
      include:{
        association: "Transactions"
      },
      attributes:["id", "name", "email", "is_admin"]
    });

    let Buyers = usersBuyers;
    Buyers.forEach((Buyer, i) => {
      if(Buyer.Transactions.length === 0){
        const { [i]: removedProperty, ...output } = Buyers;
        Buyers = output;
      }
    })

    return Buyers;
  }
  
  async getUsersSellers(){

    const usersSellers = await this.userModel.findAll({
      include:{
        association: "Products",
      },
      attributes:["id", "name", "email", "is_admin"]
    });
    
    let Sellers = usersSellers;
    Sellers.forEach((Seller, i) => {
      if(Seller.Products.length === 0){
        const { [i]: removedProperty, ...output } = Sellers;
        Sellers = output;
      }
    })

    return Sellers;
  }

  async getUsers() {

    const users = await this.userModel.findAll({
      raw: true
    });

    return users;

  }

  async getUser(id) {

    return await this.userModel.findByPk(id);

  }

  async findByEmail(email) {

    return await this.userModel.findOne({
        where: {email: email},
        raw: true
    })

  }

  async createUser(user) {

    const data = await this.userModel.create(user);    
    return data.id;

  }

  async updateUser(user) {

    const options = {
      where: {
        id: user.id,
      }
    };

    await this.userModel.update(user, options);

  }

  async deleteUser(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.userModel.destroy(options);

  }

  async deleteAllUsers() {

    if (this.test) {

      const options = {
        truncate: true
      };

      await this.userModel.destroy(options);

    }

  }

  async dropUsersTable() {

    if (this.test) {
      await this.userModel.drop();
    }

  }

}

module.exports = SequelizeUsersRepository;