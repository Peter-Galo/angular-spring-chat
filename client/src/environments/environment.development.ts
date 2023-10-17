export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
  websocketUrl: 'http://localhost:8080/ws',

  messageTopic: '/topic/rooms',
  userCountTopic: '/topic/userCount',
  roomsListTopic: '/topic/roomsList',

  sendEndpoint: '/app/sendMessage',
  sendUserCountEndpoint: '/app/getUserCount',
  roomsListEndpoint: '/app/getRoomsList',

  messagesUrl: '/api/messages',
  roomsUrl: '/api/rooms',
  userCountUrl: '/api/user-count',

  defaultRoom: 'general',
};
