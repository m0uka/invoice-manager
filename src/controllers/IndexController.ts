import express from 'express';
import { parseActor } from '../middleware/Auth';
import InvoiceController from './InvoiceController';
import CustomerController from './CustomerController';
import AuthController from './AuthController';
import SettingsController from './SettingsController';

const router = express.Router();
router.use(parseActor);

router.use('/auth', AuthController);
router.use('/invoices', InvoiceController);
router.use('/customers', CustomerController);
router.use('/settings', SettingsController);

export default router;