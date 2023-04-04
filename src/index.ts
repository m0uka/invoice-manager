import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {parseActor} from "./middleware/Auth";
import {createUserJWT} from "./services/AuthService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(parseActor);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});