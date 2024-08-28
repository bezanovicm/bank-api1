import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Rute za registraciju i prijavu
router.get('/register', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

router.post('/register', register);
router.post('/login', login);

export default router;


//app.use('/', authRoutes);  // Ruta za registraciju i prijavu


