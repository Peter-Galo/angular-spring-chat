package com.pejcko.chatserver.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    private final AppConfig appConfig;

    public RabbitMqConfig(AppConfig appConfig) {
        this.appConfig = appConfig;
    }

    @Bean
    Queue queue() {
        return new Queue(appConfig.getRabbitmq_queue(), false);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(final ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        return rabbitTemplate;
    }
}

