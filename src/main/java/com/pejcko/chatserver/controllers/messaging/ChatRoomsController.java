package com.pejcko.chatserver.controllers.messaging;

import com.pejcko.chatserver.entities.ChatRoom;
import com.pejcko.chatserver.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class ChatRoomsController {

    @Autowired
    private ChatRoomService chatRoomService;

    @MessageMapping("getRoomsList")
    @SendTo("/topic/roomsList")
    public ChatRoom getChatRooms(String roomName) {
        return chatRoomService.saveChatRoom(roomName);
    }
}


