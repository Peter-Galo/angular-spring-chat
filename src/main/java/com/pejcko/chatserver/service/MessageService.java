package com.pejcko.chatserver.service;

import com.pejcko.chatserver.entities.Message;
import com.pejcko.chatserver.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class MessageService {

    @Autowired
    public MessageRepository messageRepository;

    @Async
    public CompletableFuture<Message> saveMessage(Message message) {
        Message savedMessage = messageRepository.save(message);

        return CompletableFuture.completedFuture(savedMessage);
    }

    public List<Message> getMessages(Long roomId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        return messageRepository.findByChatRoomId(roomId, pageable).getContent();

    }
}
