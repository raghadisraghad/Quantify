package com.quantify.userservice.DTOs;

import com.quantify.userservice.models.BusinessType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateBusinessRequest {

    @NotBlank
    @Size(max = 255)
    private String name;

    @NotBlank
    @Email
    private String ownerEmail;

    @NotBlank
    @Size(min = 8)
    private String password;

    private BusinessType type;

    @NotBlank
    @Size(max = 255)
    private String ownerName;
}