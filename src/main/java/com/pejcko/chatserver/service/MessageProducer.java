package com.pejcko.chatserver.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pejcko.chatserver.DTO.MessageDto;
import com.pejcko.chatserver.config.AppConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private final AppConfig appConfig;

    public MessageProducer(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    public void sendMessageToQueue(String roomId, String messageContent) {
        MessageDto messageDto = new MessageDto();
        messageDto.setRoomId(roomId);
        messageDto.setMessageContent(messageContent);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String messageJson = objectMapper.writeValueAsString(messageDto);
            rabbitTemplate.convertAndSend(appConfig.getRabbitmq_queue(), messageJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace(); // Consider using a logger instead
        }
    }
}

