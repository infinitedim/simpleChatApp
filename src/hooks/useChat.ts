import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL: string = `http://localhost:3000`;

export default function useChat(roomId: any): {
  messages: any[];
  sendMessage: (messageBody: any) => void;
} {
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef: React.MutableRefObject<null> | any = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef?.current?.on(NEW_CHAT_MESSAGE_EVENT, (message: any): void => {
      const incomingMessage: any = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef?.current?.id,
      };
      setMessages((messages: any[]): any[] => [...messages, incomingMessage]);
    });

    return (): void => {
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: any): void => {
    socketRef?.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef?.current?.id,
    });
  };

  return { messages, sendMessage };
}
