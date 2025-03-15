import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();
router.get('/register', AuthController.showRegistrationForm);
router.get('/enter', AuthController.showLoginForm);
router.post('/register', AuthController.register);
router.post('/enter', AuthController.login);


export default router;