package com.pejcko.chatserver.service;

import com.pejcko.chatserver.entities.ChatRoom;
import com.pejcko.chatserver.repository.ChatRoomRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;


    public List<ChatRoom> getChatRooms() {

        return chatRoomRepository.findAllByOrderByNameAsc();
    }

    public ChatRoom createRoom(ChatRoom chatRoom) {
        return chatRoomRepository.save(chatRoom);
    }

    public ChatRoom findById(Long roomId) {
        return chatRoomRepository.findById(roomId).orElseThrow(() ->
                new EntityNotFoundException("ChatRoom with id " + roomId + " not found"));
    }

    public ChatRoom saveChatRoom(String roomName){
        return chatRoomRepository.save(new ChatRoom(roomName));
    }

}
