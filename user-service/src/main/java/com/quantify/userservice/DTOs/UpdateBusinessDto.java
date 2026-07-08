package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.BusinessType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBusinessDto {
    private String name;
    private String ownerEmail;
    private BusinessType type;
}
