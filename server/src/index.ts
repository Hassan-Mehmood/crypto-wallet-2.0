import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/user-route';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => res.send('Hello World!'));
app.get('/api/users', router);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
