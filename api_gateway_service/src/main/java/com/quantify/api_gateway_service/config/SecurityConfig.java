package com.quantify.api_gateway_service.config;

import com.quantify.api_gateway_service.security.AuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationFilter authenticationFilter;

    @Bean
    SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(Customizer.withDefaults())
                .authorizeExchange(exchange -> exchange

                        .pathMatchers(
                                "/",

                                "/users/login",
                                "/users/register",

                                "/businesses/login",
                                "/businesses/register"
                        ).permitAll()

                        .anyExchange().authenticated()
                )

                .addFilterAt(authenticationFilter,
                        SecurityWebFiltersOrder.AUTHENTICATION)

                .build();
    }
}