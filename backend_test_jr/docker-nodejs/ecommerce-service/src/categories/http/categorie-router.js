const express = require('express');
const appRoot = require('app-root-path');
const Categorie = require('../entities/categorie');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const authMiddlewares = require('../../auth/middlewares/auth-middlewares')

// Router (endpoints) para la sección de libros.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createCategorieRouter(manageCategoriesUsecase) {

  const router = express.Router();

  // Get All Categories
  router.get("/categories", authMiddlewares.isAuth, async (req, res) => {

    const categories = await manageCategoriesUsecase.getCategories();
    res.status(200).send(categories);

  });

  // Get Categorie by id
  router.get("/categories/:id", authMiddlewares.isAuth, async (req, res) => {
    const id = req.params.id;
    const categories = await manageCategoriesUsecase.getCategorie(id);
    
    res.status(200).send(categories);
    
  });

  router.get("/categoriesBuyerUser/:id", authMiddlewares.isAuth, async (req, res) => {
    const id = req.params.id;
    const categories = await manageCategoriesUsecase.getCategoriesBuyerUser(id);
    
    res.status(200).send(categories);
    
  });

  // Create Categorie
  router.post("/categories", authMiddlewares.isAdmin, async (req, res) => {
    
    validation = validateSchema(Categorie.schema, req);
    
    if (validation === true) {
      const categories = await manageCategoriesUsecase.createCategorie(req.body);
      res.status(201).send(categories);
    } else {
      res.status(422).send(validation)
    }

  });

  //Update Categorie
  router.put("/categories/:id",authMiddlewares.isAdmin, async (req, res) => {
    
    validation = validateSchema(Categorie.schema, req);
    
    if (validation === true) {
      const id = req.params.id;
      const categories = await manageCategoriesUsecase.updateCategorie(id, req.body);
      res.status(200).send(categories);
    } else {
      res.status(422).send(validation);
    }

  });

  // Delete Categorie
  router.delete("/categories/:id",authMiddlewares.isAdmin, async (req, res) => {

    const id = req.params.id;
    await manageCategoriesUsecase.deleteCategorie(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createCategorieRouter;