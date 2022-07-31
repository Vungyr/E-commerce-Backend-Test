const express = require('express');
const appRoot = require('app-root-path');
const Auth = require('../entities/auth');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de libros.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createAuthRouter(manageAuthUsecase) {

  const router = express.Router();

  router.post("/login", async (req, res) => {

    validation = validateSchema(Auth.schema, req);

    if (validation === true) {
        const token = await manageAuthUsecase.login(req.body);
        if(token){
        res.status(201).send(token);
        } else {res.status(401).send(token);}

    } else {
        res.status(422).send(validation)
    }
  });


  router.post("/register", async (req, res) => {

    validation = validateSchema(Auth.schema, req);

    if (validation === true) {
        const data = await manageAuthUsecase.register(req.body);
        if(data){
            res.status(201).send(data);
        } else {res.status(401).send(data);}
        
    } else {
        res.status(422).send(validation)
    }
    
  });

  return router;

}

module.exports = createAuthRouter;