const express = require('express');
const appRoot = require('app-root-path');
const Transaction = require('../entities/transaction');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");
const authMiddlewares = require('../../auth/middlewares/auth-middlewares')


// Router (endpoints) para la sección de transactions.

// Sólo se encarga de recibir las llamadas HTTP y le entrega los datos
// relevantes a los casos de uso correspondiente. Esta capa no debe
// contener lógica de negocio, sólo lo necesario para recibir y entregar
// respuestas válidas.

function createTransactionsRouter(manageTransactionsUsecase) {

  const router = express.Router();

  router.get("/transactions", authMiddlewares.isAuth, async (req, res) => {

    const transactions = await manageTransactionsUsecase.getTransactions();
    res.status(200).send(transactions);

  });

  router.get("/transactionsBuyers", authMiddlewares.isAuth, async (req, res) => {

    const transactions = await manageTransactionsUsecase.getTransactionsBuyers();
    res.status(200).send(transactions);

  });

  router.get("/transactionsSellers", authMiddlewares.isAuth, async (req, res) => {

    const transactions = await manageTransactionsUsecase.getTransactionsSellers();
    res.status(200).send(transactions);

  });

  router.get("/transactions/:id", authMiddlewares.isAuth, async (req, res) => {

    const id = req.params.id;
    const transaction = await manageTransactionsUsecase.getTransaction(id);
    
    res.status(200).send(transaction);
    
  });
  
  router.post("/transactions", authMiddlewares.isAuth, async (req, res) => {
    
    const payload = authMiddlewares.getTokenPayload(req);
    req.body.userId = payload.userId;
    validation = validateSchema(Transaction.schema, req);
    
    if (validation === true) {
      const transaction = await manageTransactionsUsecase.createTransaction(req.body);
      res.status(201).send(transaction);
    } else {
      res.status(422).send(validation)
    }

  });


  router.delete("/transactions/:id", authMiddlewares.isAuth, async (req, res) => {

    const id = req.params.id;
    await manageTransactionsUsecase.deleteTransaction(id);

    res.status(200).send(`Deleted ${id}`);

  });

  return router;

}

module.exports = createTransactionsRouter;