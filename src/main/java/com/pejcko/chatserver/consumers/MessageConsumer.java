package com.pejcko.chatserver.consumers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pejcko.chatserver.DTO.MessageDto;
import com.pejcko.chatserver.entities.ChatRoom;
import com.pejcko.chatserver.entities.Message;
import com.pejcko.chatserver.service.ChatRoomService;
import com.pejcko.chatserver.service.MessageService;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RabbitListener(queues = "#{appConfig.rabbitmq_queue}")  // Using SpEL to inject property value
public class MessageConsumer {

    @Autowired
    private MessageService messageService;

    @Autowired
    private ChatRoomService chatRoomService;

    @RabbitHandler
    public void consumeMessageFromQueue(String messageJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            MessageDto messageDto = objectMapper.readValue(messageJson, MessageDto.class);

            String roomId = messageDto.getRoomId();
            String messageContent = messageDto.getMessageContent();

            // Deserialize the messageContent into Message entity
            Message message = objectMapper.readValue(messageContent, Message.class);

            ChatRoom chatRoom = chatRoomService.findById(Long.valueOf(roomId));

            if (chatRoom == null) {
                System.err.println("Chat Room not found for ID: " + roomId);
                return;
            }

            message.setChatRoom(chatRoom);
            messageService.saveMessage(message);

        } catch (JsonProcessingException e) {
            e.printStackTrace(); // Consider using a logger instead
        }
    }
}

