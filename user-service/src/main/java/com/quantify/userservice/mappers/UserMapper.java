package com.quantify.userservice.mappers;

import com.quantify.userservice.DTOs.UserDTO;
import com.quantify.userservice.models.User;

public class UserMapper {

    public static UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .businessId(user.getBusinessId())
                .name(user.getName())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .build();
    }

    public static User toEntity(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .businessId(dto.getBusinessId())
                .name(dto.getName())
                .role(dto.getRole())
                .isActive(dto.getIsActive())
                .createdAt(dto.getCreatedAt())
                .build();
    }
}