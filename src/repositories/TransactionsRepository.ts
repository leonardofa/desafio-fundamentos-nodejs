import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }

  public getBalance(): Balance {
    const balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
    this.transactions.forEach(transaction => {
      balance.income += transaction.type === 'income' ? transaction.value : 0;
      balance.outcome += transaction.type === 'outcome' ? transaction.value : 0;
      balance.total +=
        transaction.type === 'income'
          ? transaction.value
          : transaction.value * -1;
    });

    return balance;
  }
}

export default TransactionsRepository;
