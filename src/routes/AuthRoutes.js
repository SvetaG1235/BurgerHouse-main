import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.get('/register', AuthController.showRegistrationForm);
router.post('/register', AuthController.register);
router.get('/login', AuthController.showLoginForm); 
router.post('/login', AuthController.login); 
router.get('/logout', AuthController.logout);

export default router;