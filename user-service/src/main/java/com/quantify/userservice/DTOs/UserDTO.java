package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserDTO {

    private UUID id;
    private UUID businessId;
    private String name;
    private UserRole role;
    private Boolean isActive;
    private LocalDateTime createdAt;
}
