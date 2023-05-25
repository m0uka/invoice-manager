import express from 'express';
import { getUserSettings, updateUserSettings } from '../services/SettingsService';

const router = express.Router();

router.get('/', async (req, res) => {
	const data = await getUserSettings(req.actor);
	res.send(data);
});

router.put('/', async (req, res) => {
	const data = await updateUserSettings(req.actor, req.body);
	res.send(data);
});

export default router;