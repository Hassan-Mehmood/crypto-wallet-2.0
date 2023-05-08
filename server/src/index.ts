import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user-route';
import transactionRouter from './routes/transaction-router';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', userRouter);
app.use('/api/transaction', transactionRouter);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
