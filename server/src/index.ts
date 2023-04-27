import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3001;

const prisma = new PrismaClient();

app.get('/', async (req, res) => {});

app.get('/users', async (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
