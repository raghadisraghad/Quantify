package com.quantify.userservice.DTOs;

import lombok.Data;

import java.util.UUID;

@Data
public class UserLoginRequest {
    private UUID businessId;
    private String pin;
}
