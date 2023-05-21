import express from 'express';
import { registerUser, signInUser } from '../services/AuthService';

const router = express.Router();

router.post('/sign-in', async (req, res) => {
	const jwt = await signInUser(req.body);
	res.send(jwt);
});

router.post('/register', async (req, res) => {
	const jwt = await registerUser(req.body);
	res.send(jwt);
});

export default router;