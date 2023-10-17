package com.pejcko.chatserver.repository;

import com.pejcko.chatserver.entities.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findAllByOrderByNameAsc();
}
