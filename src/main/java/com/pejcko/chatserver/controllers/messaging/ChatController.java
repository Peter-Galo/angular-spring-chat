package com.pejcko.chatserver.controllers.messaging;

import com.pejcko.chatserver.service.MessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private MessageProducer messageProducer;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/rooms/{roomId}")
    public String handleStringMessage(@DestinationVariable String roomId, String messageContent) {
        messageProducer.sendMessageToQueue(roomId, messageContent);
        return messageContent;
    }
}

