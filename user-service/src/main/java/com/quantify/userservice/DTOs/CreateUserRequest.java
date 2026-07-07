package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateUserRequest {

    @NotBlank
    private UUID businessId;

    @NotBlank
    private String name;

    @NotBlank
    private UserRole role;
}
