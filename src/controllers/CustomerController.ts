import express from 'express';
import { createCustomer, deleteCustomer, getCustomers } from '../services/CustomerService';
import { AppError } from '../middleware/Error';

const router = express.Router();

router.get('/', async (req, res) => {
	const customers = await getCustomers();
	res.send(customers);
});

router.post('/', async (req, res) => {
	// TODO: Perform some validation here

	const customer = await createCustomer(req.body);
	res.send(customer);
});

router.delete('/:id', async (req, res) => {
	await deleteCustomer(req.params.id);
	res.sendStatus(204);
});

export default router;