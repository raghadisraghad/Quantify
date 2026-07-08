package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.BusinessType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class BusinessDTO {
    private UUID id;
    private String name;
    private String ownerEmail;
    private BusinessType type;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private List<UserDTO> users;
}
