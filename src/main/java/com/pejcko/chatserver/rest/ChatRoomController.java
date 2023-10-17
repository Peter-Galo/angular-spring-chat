package com.pejcko.chatserver.rest;

import com.pejcko.chatserver.entities.ChatRoom;
import com.pejcko.chatserver.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @GetMapping
    public List<ChatRoom> getChatRooms() {
        return chatRoomService.getChatRooms();
    }

    @PostMapping
    public ChatRoom createRoom(@RequestBody ChatRoom chatRoom) {
        return chatRoomService.createRoom(chatRoom);  // Return the newly created room.
    }
}
