package com.substring.chat.services;

import com.substring.chat.entities.Message;
import com.substring.chat.entities.Room;
import com.substring.chat.repositories.MessageRepository;
import com.substring.chat.repositories.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final MessageRepository messageRepository;

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    // Get room by roomId
    public Optional<Room> getRoom(String roomId) {
        return roomRepository.findByRoomId(roomId);
    }

    // Check if room exists
    public boolean roomExists(String roomId) {
        return roomRepository.existsByRoomId(roomId);
    }

    // Save a message
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    // Get all messages of a room
    public List<Message> getMessages(String roomId) {
        return messageRepository.findByRoomId(roomId);
    }
}
