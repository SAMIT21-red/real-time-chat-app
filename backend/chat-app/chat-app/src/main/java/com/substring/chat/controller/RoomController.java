package com.substring.chat.controller;

import com.substring.chat.entities.Message;
import com.substring.chat.entities.Room;
import com.substring.chat.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
@CrossOrigin("*")
public class RoomController {
    private final RoomService roomService;

    // Create Room
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {

        if (roomService.roomExists(room.getRoomId())) {
            return ResponseEntity.badRequest().build();
        }

        Room savedRoom = roomService.createRoom(room);
        return ResponseEntity.ok(savedRoom);
    }

    // Get Room
    @GetMapping("/{roomId}")
    public ResponseEntity<Room> getRoom(@PathVariable String roomId) {

        return roomService.getRoom(roomId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get Chat History
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId) {

        return ResponseEntity.ok(roomService.getMessages(roomId));
    }
}
