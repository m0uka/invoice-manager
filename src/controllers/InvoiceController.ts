import express from 'express';
import { createInvoice, getInvoice, getInvoices } from '../services/InvoiceService';
import { authorized } from '../middleware/Auth';

const router = express.Router();
router.use(authorized);

/**
 * @openapi
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         customerId:
 *           type: string
 *         number:
 *           type: number
 *         paid:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         dueAt:
 *           type: string
 *           format: date-time
 *         currency:
 *           type: string
 * '/api/v1/invoices':
 *   get:
 *     description: Lists all invoices(paginated)
 *     tags:
 *       - Invoice
 *     responses:
 *       200:
 *         description: Returns invoices
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */
router.get('/', async (req, res) => {
	const invoices = await getInvoices();
	res.send(invoices);
});

/**
 * @openapi
 * '/api/v1/invoices/{id}':
 *   get:
 *     description: Get an invoice by ID
 *     tags:
 *       - Invoice
 *     parameters:
 *         - name: id
 *           in: path
 *           description: Invoice ID
 *           required: true
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: Returns an invoice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */
router.get('/:id', async (req, res) => {
	const invoice = await getInvoice(req.params.id);
	res.send(invoice);
})

/**
 * @openapi
 * '/api/v1/invoices':
 *   post:
 *     description: Create an invoice
 *     tags:
 *       - Invoice
 *     requestBody:
 *         description: Invoice created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */
router.post('/', async (req, res) => {
	// TODO: Perform some validation here

	const invoice = await createInvoice(req.body);
	res.send(invoice);
});

export default router;