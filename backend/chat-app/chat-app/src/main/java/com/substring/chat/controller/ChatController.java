package com.substring.chat.controller;

import com.substring.chat.entities.Message;
import com.substring.chat.payload.SystemMessage;
import com.substring.chat.payload.TypingStatus;
import com.substring.chat.repositories.MessageRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.substring.chat.payload.OnlineUsersResponse;
import com.substring.chat.payload.UserStatus;
import com.substring.chat.store.OnlineUsers;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("*")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageRepository messageRepository;
    private final OnlineUsers onlineUsers;

    public ChatController(
            SimpMessagingTemplate messagingTemplate,
            MessageRepository messageRepository,
            OnlineUsers onlineUsers
    ) {
        this.messagingTemplate = messagingTemplate;
        this.messageRepository = messageRepository;
        this.onlineUsers = onlineUsers;
    }

    @MessageMapping("/sendMessage/{roomId}")
    public void sendMessage(
            @DestinationVariable String roomId,
            Message message) {

        message.setRoomId(roomId);
        message.setTimeStamp(LocalDateTime.now());

        messageRepository.save(message);

        messagingTemplate.convertAndSend(
                "/topic/room/" + roomId,
                message
        );
    }

    @MessageMapping("/typing/{roomId}")
    public void typing(
            @DestinationVariable String roomId,
            TypingStatus status
    ) {

        System.out.println("========== TYPING ==========");
        System.out.println("Room : " + roomId);
        System.out.println("Sender : " + status.getSender());
        System.out.println("Typing : " + status.isTyping());

        messagingTemplate.convertAndSend(
                "/topic/typing/" + roomId,
                status
        );
    }
    @MessageMapping("/join/{roomId}")
    public void joinRoom(
            @DestinationVariable String roomId,
            UserStatus user
    ) {

        onlineUsers.addUser(roomId, user.getUsername());

        messagingTemplate.convertAndSend(
                "/topic/users/" + roomId,
                new OnlineUsersResponse(
                        onlineUsers.getCount(roomId),
                        onlineUsers.getUsers(roomId)
                )
        );
        messagingTemplate.convertAndSend(
                "/topic/system/" + roomId,
                new SystemMessage(
                        "JOIN",
                        user.getUsername() + " joined the room "
                )
        );
    }

    @MessageMapping("/leave/{roomId}")
    public void leaveRoom(
            @DestinationVariable String roomId,
            UserStatus user
    ) {

        onlineUsers.removeUser(roomId, user.getUsername());

        messagingTemplate.convertAndSend(
                "/topic/users/" + roomId,
                new OnlineUsersResponse(
                        onlineUsers.getCount(roomId),
                        onlineUsers.getUsers(roomId)
                )
        );
        messagingTemplate.convertAndSend(
                "/topic/system/" + roomId,
                new SystemMessage(
                        "LEAVE",
                        user.getUsername() + " left the room "
                )
        );
    }
}