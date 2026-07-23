import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

let stompClient = null;

export const connectSocket = (
  roomId,
  onMessageReceived,
  onTypingReceived,
  onUsersReceived,
  onSystemMessage
) => {

  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/chat"),

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ Connected to WebSocket");

      // Room Messages
      stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
        if (onMessageReceived) {
          onMessageReceived(JSON.parse(message.body));
        }
      });

      // Typing
      stompClient.subscribe(`/topic/typing/${roomId}`, (message) => {
        if (onTypingReceived) {
          onTypingReceived(JSON.parse(message.body));
        }
      });

      // Online Users
      stompClient.subscribe(`/topic/users/${roomId}`, (message) => {
        if (onUsersReceived) {
          onUsersReceived(JSON.parse(message.body));
        }
      });
      stompClient.subscribe(`/topic/system/${roomId}`, (message) => {

    if (onSystemMessage) {
        onSystemMessage(JSON.parse(message.body));
    }

});
    },

    onStompError: (frame) => {
      console.error("STOMP Error:", frame);
    },

    onWebSocketClose: () => {
      console.log("🔌 WebSocket Disconnected");
    },
  });

  stompClient.activate();
};

export const sendMessage = (roomId, message) => {

  if (!stompClient?.connected) return;

  stompClient.publish({
    destination: `/app/sendMessage/${roomId}`,
    body: JSON.stringify(message),
  });

};

export const joinRoom = (roomId, username) => {

  if (!stompClient?.connected) return;

  stompClient.publish({
    destination: `/app/join/${roomId}`,
    body: JSON.stringify({
      username,
    }),
  });

};

export const leaveRoom = (roomId, username) => {

  if (!stompClient?.connected) return;

  stompClient.publish({
    destination: `/app/leave/${roomId}`,
    body: JSON.stringify({
      username,
    }),
  });

};

export const sendTyping = (roomId, sender, typing) => {

  if (!stompClient?.connected) return;

  stompClient.publish({
    destination: `/app/typing/${roomId}`,
    body: JSON.stringify({
      sender,
      typing,
    }),
  });

};

export const disconnectSocket = () => {

  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }

};