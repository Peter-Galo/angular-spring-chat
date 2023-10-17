package com.pejcko.chatserver.DTO;

public class MessageDto {
    private String roomId;
    private String messageContent;

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getMessageContent() {
        return messageContent;
    }

    public void setMessageContent(String messageContent) {
        this.messageContent = messageContent;
    }

    @Override
    public String toString() {
        return "MessageDTO{" +
                "roomId='" + roomId + '\'' +
                ", messageContent='" + messageContent + '\'' +
                '}';
    }
}
