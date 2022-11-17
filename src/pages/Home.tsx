import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [roomName, setRoomName] = useState<string>("");

  const handleRoomNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/room/${roomName}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
}
