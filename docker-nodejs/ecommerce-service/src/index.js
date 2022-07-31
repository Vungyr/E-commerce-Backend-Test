const createExpressApp = require('./frameworks/http/express');

const SequelizeClient = require('./frameworks/db/sequelize');

const createTransactionsRouter = require('./transactions/http/transactions-router');
const createCategorieRouter = require('./categories/http/categorie-router');
const createProductRouter = require('./products/http/product-router');
const createUsersRouter = require('./users/http/users-router');
const createAuthRouter = require('./auth/http/auth-router');

const ManageUsersUsecase = require('./users/usecases/users-usecase');
const ManageCategoriesUsecase  = require('./categories/usecases/categories-usecase');
const ManageProductsUsecase = require('./products/usecases/products-usecase');
const ManageTransactionsUsecase = require('./transactions/usecases/transactions-usecase');
const ManageAuthUsecase = require('./auth/usecases/auth-usecase');

const SequelizeUsersRepository = require('./users/repositories/user-repository');
const SequelizeCategoriesRepository = require('./categories/repositories/categories-repository');
const SequelizeProductsRepository = require('./products/repositories/products-repository');
const SequelizeTransactionsRepository = require('./transactions/repositories/transaction-repository');

// Instanciar dependencias.

// En el caso de uso de de libros, es es posible pasarle como parámetro el repositorio
// de Firestore o el repositorio con Sequelize, y en ambos casos debería funcionar,
// incluso si el cambio se hace mientras la aplicación está en ejecución.

const sequelizeClient = new SequelizeClient();
const sequelizeProductsRepository = new SequelizeProductsRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizeTransactionsRepository = new SequelizeTransactionsRepository(sequelizeClient);
sequelizeClient.syncDatabase();

const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageAuthUsecase = new ManageAuthUsecase(sequelizeUsersRepository);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);
const manageProductsUsecase = new ManageProductsUsecase(sequelizeProductsRepository);
const manageTransactionsUsecase = new ManageTransactionsUsecase(sequelizeTransactionsRepository);

let routers = [
  createProductRouter(manageProductsUsecase),
  createCategorieRouter(manageCategoriesUsecase),
  createUsersRouter(manageUsersUsecase),
  createAuthRouter(manageAuthUsecase),
  createTransactionsRouter(manageTransactionsUsecase),
  
];
  
// Creamos asociaciones
associateModels(sequelizeClient);

// Crear aplicación Express con dependencias inyectadas.
const app = createExpressApp(routers);


function associateModels (sequelizeClient){
  const models = sequelizeClient.sequelize.models;
  const arrayModel = Object.values(models);
  arrayModel.forEach(model =>{
    model.associate(models);
  });
}