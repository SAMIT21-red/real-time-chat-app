import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import MessageList from "../components/MessageList";

import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  joinRoom,
  leaveRoom,
} from "../services/SocketService";

import { getMessages } from "../services/RoomService";

const ChatPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const username = location.state?.username || "Guest";

  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const [onlineUsers, setOnlineUsers] = useState({
    count: 0,
    users: [],
  });

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await getMessages(roomId);
        setMessages(response.data.messages || response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadMessages();

    connectSocket(
  roomId,

  // Chat Messages
  (message) => {
    setMessages((prev) => [...prev, message]);
  },

  // Typing
  (data) => {
    if (data.sender === username) return;

    if (data.typing) {
      setTypingUser(data.sender);
    } else {
      setTypingUser("");
    }
  },

  // Online Users
  (users) => {
    setOnlineUsers(users);
  },

  // System Messages
  (systemMessage) => {
    setMessages((prev) => [
      ...prev,
      {
        system: true,
        type: systemMessage.type,
        content: systemMessage.content,
      },
    ]);
  }
);

    // Give socket a moment to connect
    const timer = setTimeout(() => {
      joinRoom(roomId, username);
    }, 500);

    return () => {
      clearTimeout(timer);

      leaveRoom(roomId, username);

      disconnectSocket();
    };
  }, [roomId, username]);

  const handleSend = (text) => {
    const message = {
      sender: username,
      content: text,
      timeStamp: new Date(),
    };

    sendMessage(roomId, message);
  };

  const handleLeaveRoom = () => {
    leaveRoom(roomId, username);
    disconnectSocket();
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <ChatHeader
        roomId={roomId}
        username={username}
        onlineCount={onlineUsers.count}
        onlineUsers={onlineUsers.users}
        onLeave={handleLeaveRoom}
      />

      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={messages}
          username={username}
        />
      </div>

      <ChatInput
        onSend={handleSend}
        roomId={roomId}
        username={username}
        typing={typingUser}
      />
    </div>
  );
};

export default ChatPage;