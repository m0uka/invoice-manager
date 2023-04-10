import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import BaseController from './controllers/IndexController';
import handleError from './middleware/Error';
import { useSwaggerDocs } from './utils/swagger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(bodyParser.json({ limit: '100mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Invoice Manager API');
});

app.use('/api/v1', BaseController);

useSwaggerDocs(app);

app.use(handleError);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});