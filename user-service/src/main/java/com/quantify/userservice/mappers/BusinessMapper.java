package com.quantify.userservice.mappers;

import com.quantify.userservice.DTOs.BusinessDTO;
import com.quantify.userservice.models.Business;

public class BusinessMapper {

    public static BusinessDTO toDto(Business business) {
        return BusinessDTO.builder()
                .id(business.getId())
                .name(business.getName())
                .ownerEmail(business.getOwnerEmail())
                .type(business.getType())
                .isActive(business.getIsActive())
                .createdAt(business.getCreatedAt())
                .users(
                        business.getUsers()
                                .stream()
                                .map(UserMapper::toDto)
                                .toList()
                )
                .build();
    }

    public static Business toEntity(BusinessDTO dto) {
        return Business.builder()
                .id(dto.getId())
                .name(dto.getName())
                .ownerEmail(dto.getOwnerEmail())
                .type(dto.getType())
                .isActive(dto.getIsActive())
                .createdAt(dto.getCreatedAt())
                .users(
                        dto.getUsers()
                                .stream()
                                .map(UserMapper::toEntity)
                                .toList()
                )
                .build();
    }
}