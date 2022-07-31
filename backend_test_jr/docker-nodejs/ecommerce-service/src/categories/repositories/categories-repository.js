
const { DataTypes } = require('sequelize');

// Implementación con Sequelize para el repositorio de categorias.
// Recibe la conexión con Sequelize externamente.

class SequelizeCategoriesRepository {

  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;
    
    // Mapear la tabla Categorie.
    // Si "test" es true, se le agrega un sufijo al nombre de la tabla,
    // para que las pruebas de integración no sobreescriban los datos existentes.

    let tableName = "Categorie";

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
      description:{ 
        type: DataTypes.STRING(500),
        allowNull: false,
        field: "description",
      },

    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    const Categorie = sequelizeClient.sequelize.define('Categorie', columns, options);

    // Associate whit Products
    Categorie.associate = function(models) {
        models.Categorie.hasMany(models.Product);
    }

    this.categorieModel = Categorie

  }

  async getCategories() {

    const categories = await this.categorieModel.findAll({
      raw: true
    });

    return categories;

  }

  async getCategoriesBuyerUser(id) {

    const categoriesUserBuyer = await this.categorieModel.findAll({
      include:[
        {
          association: "Products",
          where: { UserId: id },
          attributes:[]
        }
      ]
    });

    if(categoriesUserBuyer.length === 0) { return { msg:"user id, is not buyer." }}

    return categoriesUserBuyer;

  }

  async getCategorie(id) {

    return await this.categorieModel.findByPk(id);

  }

  async createCategorie(categorie) {

    const data = await this.categorieModel.create(categorie);    
    return data.id;

  }

  async updateCategorie(categorie) {

    const options = {
      where: {
        id: categorie.id,
      }
    };

    await this.categorieModel.update(categorie, options);

  }

  async deleteCategorie(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.categorieModel.destroy(options);

  }

  async deleteAllCategories() {

    if (this.test) {

      const options = {
        truncate: true
      };

      await this.categorieModel.destroy(options);

    }

  }

  async dropCategoriesTable() {

    if (this.test) {
      await this.categorieModel.drop();
    }

  }

}

module.exports = SequelizeCategoriesRepository;