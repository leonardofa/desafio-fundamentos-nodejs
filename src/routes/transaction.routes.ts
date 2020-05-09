import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionsRepository = new TransactionsRepository();
const transactionRouter = Router();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(err.status || 400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    return response.json(
      createTransactionService.execute({ title, value, type }),
    );
  } catch (err) {
    return response.status(err.status || 400).json({ error: err.message });
  }
});

export default transactionRouter;
