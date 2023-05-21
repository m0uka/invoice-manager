import express from 'express';
import { parseActor } from '../middleware/Auth';
import InvoiceController from './InvoiceController';
import CustomerController from './CustomerController';
import AuthController from './AuthController';

const router = express.Router();
router.use(parseActor);

router.use('/auth', AuthController);
router.use('/invoices', InvoiceController);
router.use('/customers', CustomerController);

export default router;