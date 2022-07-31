const express = require('express');
const appRoot = require('app-root-path');
const Product = require('../entities/product');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const authMiddlewares = require('../../auth/middlewares/auth-middlewares')


// Router (endpoints) para la sección de productos.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createProductsRouter(manageProductsUsecase) {

  const router = express.Router();

  router.get("/products", authMiddlewares.isAuth, async (req, res) => {

    const products = await manageProductsUsecase.getProducts();
    res.status(200).send(products);

  });

  router.get("/products/:id", authMiddlewares.isAuth, async (req, res) => {

    const id = req.params.id;
    const product = await manageProductsUsecase.getProduct(id);
    
    res.status(200).send(product);
    
  });
  
  router.post("/products", authMiddlewares.isAuth, async (req, res) => {
    
    const payload = authMiddlewares.getTokenPayload(req);
    req.body.UserId = payload.userId;
    validation = validateSchema(Product.schema, req);

    if (validation === true) {
      const product = await manageProductsUsecase.createProduct(req.body);
      res.status(201).send(product);
    } else {
      res.status(422).send(validation)
    }

  });

  router.put("/products/:id", authMiddlewares.isAuth, async (req, res) => {
    
    const payload = authMiddlewares.getTokenPayload(req);
    req.body.userId = payload.userId;
    validation = validateSchema(Product.schema, req);
    
    if (validation === true) {
      const id = req.params.id;
      const product = await manageProductsUsecase.updateProduct(id, req.body);
      res.status(200).send(product);
    } else {
      res.status(422).send(validation);
    }

  });

  router.delete("/products/:id", authMiddlewares.isAuth, async (req, res) => {

    const id = req.params.id;
    await manageProductsUsecase.deleteProduct(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createProductsRouter;