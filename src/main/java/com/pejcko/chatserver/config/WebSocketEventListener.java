package com.pejcko.chatserver.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.concurrent.atomic.AtomicInteger;

@Component
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final AtomicInteger connectedUsersCounter = new AtomicInteger();

    public WebSocketEventListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        connectedUsersCounter.incrementAndGet();
        System.out.println("Received a new web socket connection. Connected users: " + connectedUsersCounter);
        messagingTemplate.convertAndSend("/topic/userCount", connectedUsersCounter.get());
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        connectedUsersCounter.decrementAndGet();
        System.out.println("User disconnected. Connected users: " + connectedUsersCounter);
        messagingTemplate.convertAndSend("/topic/userCount", connectedUsersCounter.get());
    }

    public int getConnectedUsersCount() {
        return connectedUsersCounter.get();
    }
}
