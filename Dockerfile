# Stage 1: Build with Maven
FROM maven:3.8.3-openjdk-17 as build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
COPY ./client /app/client
RUN mvn clean package -DskipTests -Pprod

# Stage 2: Run the JAR
FROM openjdk:17
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
