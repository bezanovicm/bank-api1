import express from 'express';
import { createTransaction, getAllTransactions, deleteTransaction, updateTransaction } from '../controllers/transactionController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Ova ruta prikazuje praznu formu za transakcije
router.get('/', verifyToken, (req, res) => {
    res.render('transactions', { accountNumber: '', transactions: [] });
});

// Ruta za prikaz svih transakcija za određeni račun
router.get('/:accountNumber', verifyToken, getAllTransactions);

// Kreiranje transakcije
router.post('/create', verifyToken, createTransaction);

// Brisanje transakcije
router.delete('/:id', verifyToken, deleteTransaction);

// Ažuriranje transakcije
router.put('/:id', verifyToken, updateTransaction);

export default router;
