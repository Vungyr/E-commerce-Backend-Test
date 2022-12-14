const { Sequelize } = require('sequelize');
const config = require('../../../config/config').development

// Conexión a una base de datos SQL por medio del ORM 
// Es agnóstico a la base de datos misma (MySQL, Postgres, etc).

class SequelizeClient {

  constructor() {

    // Obtener datos desde variables de entorno.

    const dialect = config.dialect;
    const username = config.username;
    const password = config.password;
    const database = config.database;
    const port = config.port;

    // Obtener el host o el socket. Sólo se usa uno de los dos para la conexión.
    // El socket es útil para conectarse con una base de datos en GCP.

    const host = process.env.SEQUELIZE_HOST;
    const socket = process.env.SEQUELIZE_SOCKET;

    let socketPath = undefined;

    if (host === undefined && socket !== undefined) {
      socketPath = "/cloudsql/" + socket;
    }

    this.sequelize = new Sequelize(database, username, password, {
      dialect: dialect,
      host: host,
      port: port,
      dialectOptions: {
        socketPath: socketPath,
      },
      logging: false,
    });

  }

  syncDatabase() {

    // Crea las tablas que no existan en la base de datos en base a los modelos definidos.

    var syncOptions = {
      alter: false,
    };

    this.sequelize.sync(syncOptions)
      .catch(error => {
        console.log("Couldn't sync database", error);
      });

  }

}

module.exports = SequelizeClient;