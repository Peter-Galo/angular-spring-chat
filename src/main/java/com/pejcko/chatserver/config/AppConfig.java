package com.pejcko.chatserver.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

@Configuration
@ConfigurationProperties(prefix = "config")
@Validated
public class AppConfig {

    private String rabbitmq_queue;

    public String getRabbitmq_queue() {
        return rabbitmq_queue;
    }

    public void setRabbitmq_queue(String rabbitmq_queue) {
        this.rabbitmq_queue = rabbitmq_queue;
    }
}