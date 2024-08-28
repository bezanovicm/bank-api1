import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';

// Kreiranje nove transakcije i ažuriranje salda računa
export const createTransaction = async (req, res) => {
    const { accountNumber, transactionType, amount, date } = req.body;

    try {
        // Proveri da li postoji račun sa datim accountNumber
        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Kreiranje nove transakcije
        const transaction = new Transaction({ accountNumber, transactionType, amount, date });
        await transaction.save();

        // Ažuriranje salda računa
        if (transactionType === 'credit') {
            account.balance += amount;
        } else if (transactionType === 'debit') {
            account.balance -= amount;
        }
        await account.save();

        // Prikaz svih transakcija za određeni račun
        const transactions = await Transaction.find({ accountNumber });

        // Renderovanje stranice sa transakcijama i ažuriranim stanjem računa
        res.render('transactions', { accountNumber, transactions, balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dohvati sve transakcije za određeni račun i prosledi balance
export const getAllTransactions = async (req, res) => {
    const { accountNumber } = req.params;

    try {
        // Pronalazak svih transakcija za dati accountNumber
        const transactions = await Transaction.find({ accountNumber });

        // Pronalazak računa na osnovu accountNumber
        const account = await Account.findOne({ accountNumber });

        // Proveri da li je račun pronađen
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Renderovanje stranice sa transakcijama i balansom računa
        res.render('transactions', { accountNumber, transactions, balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Brisanje transakcije i ažuriranje salda
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ažuriraj saldo računa nakon brisanja transakcije
        const account = await Account.findOne({ accountNumber: transaction.accountNumber });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (transaction.transactionType === 'credit') {
            account.balance -= transaction.amount;
        } else if (transaction.transactionType === 'debit') {
            account.balance += transaction.amount;
        }
        await account.save();

        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ažuriranje transakcije i salda računa
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, transactionType } = req.body;

        // Nađi staru transakciju
        const oldTransaction = await Transaction.findById(id);
        if (!oldTransaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Ažuriraj transakciju
        const transaction = await Transaction.findByIdAndUpdate(id, { amount, transactionType }, { new: true });

        // Ažuriraj saldo računa na osnovu promene u transakciji
        const account = await Account.findOne({ accountNumber: transaction.accountNumber });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // Poništi stari saldo
        if (oldTransaction.transactionType === 'credit') {
            account.balance -= oldTransaction.amount;
        } else if (oldTransaction.transactionType === 'debit') {
            account.balance += oldTransaction.amount;
        }

        // Primeni novi saldo
        if (transaction.transactionType === 'credit') {
            account.balance += transaction.amount;
        } else if (transaction.transactionType === 'debit') {
            account.balance -= transaction.amount;
        }

        await account.save();

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


