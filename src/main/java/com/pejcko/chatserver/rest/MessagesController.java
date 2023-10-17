package com.pejcko.chatserver.rest;

import com.pejcko.chatserver.entities.Message;
import com.pejcko.chatserver.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages/{roomId}")
public class MessagesController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getMessages(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @PathVariable String roomId) {
        return messageService.getMessages(Long.parseLong(roomId), page, size);
    }
}
