import express from 'express';
import { createCustomer, deleteCustomer, getCustomers } from '../services/CustomerService';

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         number:
 *           type: number
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
 *         taxExempt:
 *           type: boolean
 * '/api/v1/customers':
 *   get:
 *     description: Lists all customers (paginated)
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Returns customers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */
router.get('/', async (req, res) => {
	const customers = await getCustomers();
	res.send(customers);
});

/**
 * @openapi
 * '/api/v1/customers':
 *   post:
 *     description: Create a customer
 *     tags:
 *       - Customer
 *     requestBody:
 *         description: Customer created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */
router.post('/', async (req, res) => {
	// TODO: Perform some validation here

	const customer = await createCustomer(req.body);
	res.send(customer);
});

/**
 * @openapi
 * '/api/v1/customers/{id}':
 *   delete:
 *     description: Delete a customer
 *     tags:
 *       - Customer
 *     parameters:
 *         - name: id
 *           in: path
 *           description: Customer ID
 *           required: true
 *           schema:
 *             type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.delete('/:id', async (req, res) => {
	await deleteCustomer(req.params.id);
	res.sendStatus(204);
});

export default router;