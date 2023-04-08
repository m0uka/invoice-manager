import express from 'express';
import { createInvoice, getInvoice, getInvoices } from '../services/InvoiceService';

const router = express.Router();

router.get('/', async (req, res) => {
	const invoices = await getInvoices();
	res.send(invoices);
});

router.get('/:id', async (req, res) => {
	const invoice = await getInvoice(req.params.id);
	res.send(invoice);
})

router.post('/', async (req, res) => {
	// TODO: Perform some validation here

	const invoice = await createInvoice(req.body);
	res.send(invoice);
});

export default router;