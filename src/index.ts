import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { connect } from 'mongoose';
import * as routes from './routes';

dotenv.config()

const app = express();
const port = 9000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect('mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

for (let route of Object.values(routes)) route.router(app);

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
});

httpServer.listen(port, () => {
  console.log(`Express API listening at http://localhost:${port}`)
});
