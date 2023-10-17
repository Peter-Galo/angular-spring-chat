export const environment = {
  production: true,
  baseUrl: 'https://king-prawn-app-nvfkd.ondigitalocean.app',
  websocketUrl: 'https://king-prawn-app-nvfkd.ondigitalocean.app/ws',

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
