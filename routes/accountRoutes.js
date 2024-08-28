import express from 'express';
import { createAccount, getAllAccounts, deleteAccount, updateAccount } from '../controllers/accountController.js';
import { verifyToken } from '../controllers/authController.js';

const router = express.Router();

// Kreiranje novog računa
router.post('/create', verifyToken, createAccount);

// Prikaz svih računa
router.get('/', verifyToken, getAllAccounts);

// Brisanje računa
router.delete('/:id', verifyToken, deleteAccount);

// Ažuriranje računa
router.put('/:id', verifyToken, updateAccount);

export default router;
