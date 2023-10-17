package com.pejcko.chatserver.repository;

import com.pejcko.chatserver.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByChatRoomId(Long roomId, Pageable pageable);

}
