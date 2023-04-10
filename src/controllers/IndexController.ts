import express from 'express';
import { parseActor } from '../middleware/Auth';
import InvoiceController from './InvoiceController';
import CustomerController from './CustomerController';

const router = express.Router();
router.use(parseActor);

router.use('/invoices', InvoiceController);
router.use('/customers', CustomerController);

export default router;