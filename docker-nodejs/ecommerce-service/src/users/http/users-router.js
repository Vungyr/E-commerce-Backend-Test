const express = require('express');
const appRoot = require('app-root-path');
const User = require('../entities/user');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de users.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createUsersRouter(manageUsersUsecase) {

  const router = express.Router();

  router.get("/usersBuyers", async (req, res) => {

    const users = await manageUsersUsecase.getUsersBuyers();
    res.status(200).send(users);

  });

  router.get("/usersSellers", async (req, res) => {

    const users = await manageUsersUsecase.getUsersSellers();
    res.status(200).send(users);

  });

  router.get("/users", async (req, res) => {

    const users = await manageUsersUsecase.getUsers();
    res.status(200).send(users);

  });

  router.get("/users/:id", async (req, res) => {

    const id = req.params.id;
    const users = await manageUsersUsecase.getUser(id);
    
    res.status(200).send(users);
    
  });
  
  router.post("/users", async (req, res) => {
    
    validation = validateSchema(User.schema, req);
    
    if (validation === true) {
      const user = await manageUsersUsecase.createUsersRouter(req.body);
      res.status(201).send(user);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/users/:id", async (req, res) => {
    
    validation = validateSchema(User.schema, req);
    
    if (validation === true) {
      const id = req.params.id;
      const user = await manageUsersUsecase.updateUser(id, req.body);
      res.status(200).send(user);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/users/:id", async (req, res) => {

    const id = req.params.id;
    await manageUsersUsecase.deleteUser(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createUsersRouter;