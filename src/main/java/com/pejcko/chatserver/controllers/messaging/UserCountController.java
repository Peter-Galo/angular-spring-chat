package com.pejcko.chatserver.controllers.messaging;

import com.pejcko.chatserver.config.WebSocketEventListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class UserCountController {

    @Autowired
    private WebSocketEventListener webSocketEventListener;

    @MessageMapping("getUserCount")
    @SendTo("/topic/userCount")
    public Integer getUserCount() {
        return webSocketEventListener.getConnectedUsersCount();
    }
}
