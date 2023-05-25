import express from 'express';
import { getUserSettings, updateUserSettings } from '../services/SettingsService';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Settings:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         streetAddress:
 *           type: string
 *         postalCode:
 *           type: string
 *         city:
 *           type: string
 *         country:
 *           type: string
 *         identificationNumber:
 *           type: string
 *         vatPayer:
 *           type: boolean
 *         preferredCurrency:
 *           type: string
 *         additionalText:
 *           type: string
 * '/api/v1/settings':
 *   get:
 *     description: Retrieves user settings
 *     tags:
 *       - Settings
 *     responses:
 *       200:
 *         description: Returns user settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Settings'
*/
router.get('/', async (req, res) => {
	const data = await getUserSettings(req.actor);
	res.send(data);
});

/**
 * @openapi
 * '/api/v1/settings':
 *   put:
 *     description: Update user settings
 *     tags:
 *       - Settings
 *     requestBody:
 *         description: User settings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Settings'
 */
router.put('/', async (req, res) => {
	const data = await updateUserSettings(req.actor, req.body);
	res.send(data);
});

export default router;