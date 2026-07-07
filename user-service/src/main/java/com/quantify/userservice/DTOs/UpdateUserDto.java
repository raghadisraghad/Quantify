package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {
    private String name;
    private UserRole role;
}
