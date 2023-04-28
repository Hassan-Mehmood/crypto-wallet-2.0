import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { body, validationResult } from 'express-validator';

import { prisma } from './utils/client';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => res.send('Hello World!'));

app.post(
  '/api/create-user',

  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      const user = await prisma.user.create({
        data: { name, email, password },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
