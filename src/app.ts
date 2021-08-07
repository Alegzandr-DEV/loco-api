import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const port = 9000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
});

httpServer.listen(port, () => {
  console.log(`Express API listening at http://localhost:${port}`)
});
