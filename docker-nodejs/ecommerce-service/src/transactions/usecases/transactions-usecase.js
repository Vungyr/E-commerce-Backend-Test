const Transaction = require('../entities/transaction');

// Casos de uso para el manejo de transactions.
// Acá va la lógica de negocio agnóstica a los frameworks,
// recibiendo como parámetros las dependencias necesarias.

class ManageTransactionsUsecase {

  constructor(transactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  async getTransactions() {
    return await this.transactionsRepository.getTransactions();
  }

  async getTransactionsBuyers() {
    return await this.transactionsRepository.getTransactionsBuyers();
  }

  async getTransactionsSellers() {
    return await this.transactionsRepository.getTransactionsSellers();
  }

  async getTransaction(id) {
    return await this.transactionsRepository.getTransaction(id);
  }

  async createTransaction(data) {
    
    const transaction = new Transaction(undefined, data.userId, data.productId);
    const id = await this.transactionsRepository.createTransaction(transaction);
    if(id.msg){
      transaction.msg = id.msg
    } else{transaction.id = id};

    return transaction;

  }

  async deleteTransaction(id) {
    await this.transactionsRepository.deleteTransaction(id);
  }

}

module.exports = ManageTransactionsUsecase;