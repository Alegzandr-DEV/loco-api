import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();
const port = 9000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Express API listening at http://localhost:${port}`)
});
