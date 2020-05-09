import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!title) {
      throw Error('Title is required');
    }

    if (!value) {
      throw Error('Value is required');
    }

    if (typeof value !== 'number' || value <= 0) {
      throw Error('Value is not valid');
    }

    if (!type) {
      throw Error('Type is required');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type is not valid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw Error('There is no value to outcome transaction');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
