package com.substring.chat.store;

import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OnlineUsers {

    // roomId -> Set of usernames
    private final Map<String, Set<String>> roomUsers = new ConcurrentHashMap<>();

    // Add user to a room
    public void addUser(String roomId, String username) {
        roomUsers
                .computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet())
                .add(username);
    }

    // Remove user from a room
    public void removeUser(String roomId, String username) {
        Set<String> users = roomUsers.get(roomId);

        if (users != null) {
            users.remove(username);

            if (users.isEmpty()) {
                roomUsers.remove(roomId);
            }
        }
    }

    // Get all users in a room
    public Set<String> getUsers(String roomId) {
        return roomUsers.getOrDefault(roomId, Collections.emptySet());
    }

    // Get online user count
    public int getCount(String roomId) {
        return getUsers(roomId).size();
    }
}