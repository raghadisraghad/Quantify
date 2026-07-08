package com.quantify.userservice.DTOs;

import lombok.Data;

@Data
public class BusinessLoginRequest {
    private String email;
    private String password;
}
