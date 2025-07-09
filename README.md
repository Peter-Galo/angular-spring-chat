# Angular Spring Chat Application

<p align="center">
  <img src="/assets/images/logo.png?text=chat" alt="Chat Logo" width="100"/>
</p>

A full-stack real-time chat application built with Spring Boot backend and Angular frontend, featuring WebSocket communication, message queuing with RabbitMQ, and persistent storage with IBM DB2.

## 🏗️ Architecture Overview

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.1.4 with Java 17
- **Database**: IBM DB2 with JPA/Hibernate
- **Messaging**: RabbitMQ for message queuing
- **Real-time Communication**: WebSocket with STOMP protocol
- **Build Tool**: Maven 3.8.3

### Frontend (Angular)
- **Framework**: Angular 16
- **WebSocket Client**: STOMP.js with SockJS
- **Build Tool**: Angular CLI
- **Package Manager**: npm

### Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Profiles**: Development and Production configurations
- **Web Server**: Embedded Tomcat (Spring Boot)

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **Multiple Chat Rooms**: Create and join different chat rooms
- **Message Persistence**: All messages are stored in IBM DB2 database
- **Message Queuing**: RabbitMQ ensures reliable message delivery
- **Responsive UI**: Modern Angular frontend with responsive design
- **Scalable Architecture**: Microservices-ready with message queuing
- **Cross-Origin Support**: CORS enabled for frontend-backend communication
- **Pagination**: Message history with pagination support

## 📋 Prerequisites

### Development Environment
- **Java 17** or higher
- **Node.js 18.16.0** and **npm 9.6.4**
- **Maven 3.8.3** or higher
- **IBM DB2** database instance
- **RabbitMQ** server

### Production Environment
- **Docker** and **Docker Compose**
- **IBM DB2** database (cloud or on-premise)
- **RabbitMQ** server

## 🛠️ Installation & Setup

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-spring-chat
   ```

2. **Database Configuration**
   - Set up IBM DB2 database
   - Update `src/main/resources/application-dev.yml` with your database credentials:
   ```yaml
   spring:
     datasource:
       username: your_db_username
       password: your_db_password
       url: jdbc:db2://your-db-host:port/database_name:sslConnection=true;
   ```

3. **RabbitMQ Configuration**
   - Install and start RabbitMQ server
   - Default configuration uses localhost:5672 with guest/guest credentials
   - Update `application-dev.yml` if using different settings

4. **Backend Setup**
   ```bash
   # Build and run Spring Boot application
   ./mvnw spring-boot:run -Pdev
   ```

5. **Frontend Setup**
   ```bash
   # Navigate to client directory
   cd client
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080

### Production Deployment with Docker

1. **Set Environment Variables**
   ```bash
   export DB_USERNAME=your_db_username
   export DB_PASSWORD=your_db_password
   export DB_URL=jdbc:db2://your-db-host:port/database_name:sslConnection=true;
   export MAXIMUM_POOL_SIZE=10
   export RABBITMQ_HOST=your_rabbitmq_host
   export RABBITMQ_PORT=5672
   export RABBITMQ_USER=your_rabbitmq_user
   export RABBITMQ_PASSWORD=your_rabbitmq_password
   export RABBITMQ_VIRTUAL_HOST=/
   export RABBITMQ_QUEUE=myQueue
   ```

2. **Build and Run with Docker**
   ```bash
   # Build Docker image
   docker build -t angular-spring-chat .
   
   # Run container
   docker run -p 8080:8080 \
     -e DB_USERNAME=$DB_USERNAME \
     -e DB_PASSWORD=$DB_PASSWORD \
     -e DB_URL=$DB_URL \
     -e MAXIMUM_POOL_SIZE=$MAXIMUM_POOL_SIZE \
     -e RABBITMQ_HOST=$RABBITMQ_HOST \
     -e RABBITMQ_PORT=$RABBITMQ_PORT \
     -e RABBITMQ_USER=$RABBITMQ_USER \
     -e RABBITMQ_PASSWORD=$RABBITMQ_PASSWORD \
     -e RABBITMQ_VIRTUAL_HOST=$RABBITMQ_VIRTUAL_HOST \
     -e RABBITMQ_QUEUE=$RABBITMQ_QUEUE \
     angular-spring-chat
   ```

## 📡 API Documentation

### REST Endpoints

#### Chat Rooms
- `GET /api/rooms` - Get all chat rooms
- `POST /api/rooms` - Create a new chat room
  ```json
  {
    "name": "Room Name"
  }
  ```

#### Messages
- `GET /api/messages/{roomId}` - Get messages for a specific room (with pagination)

### WebSocket Endpoints

#### Message Sending
- **Destination**: `/app/sendMessage/{roomId}`
- **Subscribe**: `/topic/rooms/{roomId}`
- **Payload**: String message content

#### Connection
- **Endpoint**: `/ws`
- **Protocol**: STOMP over SockJS

## 🗄️ Database Schema

### ChatRoom Entity
```sql
CREATE TABLE chatrooms (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL
);
```

### Message Entity
```sql
CREATE TABLE messages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    sender VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    room_id BIGINT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES chatrooms(id)
);
```

## 🔧 Configuration

### Application Profiles

#### Development (`application-dev.yml`)
- Local database connection
- Local RabbitMQ instance
- Debug logging enabled

#### Production (`application-prod.yml`)
- Environment variable-based configuration
- Optimized connection pooling
- Production-ready settings

### Frontend Configuration
- WebSocket connection to backend
- STOMP client configuration
- Angular build optimization for production

## 🧪 Testing

### Backend Tests
```bash
./mvnw test
```

### Frontend Tests
```bash
cd client
npm test
```

## 📦 Build Process

### Development Build
```bash
# Backend only
./mvnw spring-boot:run

# Frontend only
cd client && npm start
```

### Production Build
```bash
# Full build (includes Angular build)
./mvnw clean package -Pprod

# Docker build
docker build -t angular-spring-chat .
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify DB2 server is running
   - Check connection string and credentials
   - Ensure SSL configuration is correct

2. **RabbitMQ Connection Issues**
   - Verify RabbitMQ server is running
   - Check host, port, and credentials
   - Ensure virtual host exists

3. **WebSocket Connection Issues**
   - Check CORS configuration
   - Verify WebSocket endpoint is accessible
   - Check browser console for connection errors

4. **Build Issues**
   - Ensure Node.js and npm versions match requirements
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 🔗 Related Technologies

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Angular](https://angular.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [IBM DB2](https://www.ibm.com/products/db2-database)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [STOMP](https://stomp.github.io/)