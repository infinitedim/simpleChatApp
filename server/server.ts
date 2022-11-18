import express from "express";
import type { Express } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import dotenv from "dotenv";
import { ParsedUrlQuery } from "querystring";

dotenv.config();

const app: Express = express();
const NEW_CHAT_MESSAGE_EVENT: string = "newChatMessage";
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);
const PORT: string | number =
  process.env.PORT !== undefined ? process.env.PORT : 3000;
const corsOptions: CorsOptions = {
  origin: "*",
};
const io = new SocketIOServer(server, {
  cors: corsOptions,
});

// Middlewares
app.use(cors());
app.use(helmet());

io.on(
  "connection",
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) => {
    const { roomId } = socket.handshake.query;
    socket.join(roomId as string);
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId as string).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on("disconnect", (): void => {
      socket.leave(roomId as string);
    });
  },
);

server.listen(PORT, (): void => {
  console.log(`Server is listening on port ${PORT}`);
});
