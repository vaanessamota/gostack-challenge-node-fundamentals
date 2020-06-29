import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    incomeTransactions.forEach(transaction => {
      income += transaction.value;
    });
    const outcomeTransactions = this.transactions.filter(
      trasanction => trasanction.type === 'outcome',
    );
    outcomeTransactions.forEach(transaction => {
      outcome += transaction.value;
    });
    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
