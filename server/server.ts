import express from "express";
import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const io = new Server(88);
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const server = http.createServer();
const PORT = process.env.PORT !== undefined ? process.env.PORT : 8080;

// Middlewares
app.use(cors());
app.use(helmet());

io.on(
  "connection",
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) => {
    const roomId: any = socket?.handshake?.query;
    socket.join(roomId);
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on("disconnect", (): void => {
      socket.leave(roomId);
    });
  },
);

server.listen(PORT, (): void => {
  console.log(`Server is listening on port ${PORT}`);
});
