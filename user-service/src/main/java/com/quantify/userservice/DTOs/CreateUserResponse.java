package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.UserRole;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class CreateUserResponse {
    private UUID businessId;
    private String name;
    private UserRole role;
    private String pin;
}
