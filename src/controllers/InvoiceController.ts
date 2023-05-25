import express from 'express';
import { createInvoice, getInvoiceById, getInvoices, createInvoiceLine, createInvoicePayment, updateInvoice } from '../services/InvoiceService';
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
	const invoice = await getInvoiceById(req.params.id);
	res.send(invoice);
})

/**
 * @openapi
 * '/api/v1/invoices/{id}':
 *   put:
 *     description: Update an invoice
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
 *         description: Returns the updated invoice
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 */
router.put('/:id', async (req, res) => {
	const invoice = await updateInvoice(req.params.id, req.body);
	res.send(invoice);
});

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
	const invoice = await createInvoice(req.body);
	res.send(invoice);
});

/**
 * @openapi
 * '/api/v1/invoices/{id}/lines':
 *   post:
 *     description: Insert an invoice line
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
 *         description: Returns the created invoice line
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoiceLine'
 */
router.post('/:id/lines', async (req, res) => {
	req.body.invoiceId = req.params.id;

	const invoiceLine = await createInvoiceLine(req.body);
	res.send(invoiceLine);
});

/**
 * @openapi
 * '/api/v1/invoices/{id}/payments':
 *   post:
 *     description: Insert an invoice payment
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
 *         description: Returns the created invoice payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoicePayment'
 */
router.post('/:id/payments', async (req, res) => {
	req.body.invoiceId = req.params.id;

	const invoicePayment = await createInvoicePayment(req.body);
	res.send(invoicePayment);
});

export default router;