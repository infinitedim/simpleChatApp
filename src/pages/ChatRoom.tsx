import { useState } from "react";
import { useParams } from "react-router-dom";
import useChat from "../hooks/useChat";

export default function ChatRoom(): JSX.Element {
  const id = useParams();
  const { roomId } = id;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleNewMessageChange = (event: any): void => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (): void => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map(
            (message: any, i: number): JSX.Element => (
              <li
                key={i}
                className={`message-item ${
                  message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
              >
                {message.body}
              </li>
            )
          )}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
}
