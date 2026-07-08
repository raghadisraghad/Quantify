package com.quantify.userservice.DTOs;

import lombok.Data;

@Data
public class UpdatePasswordDTO {
    public String newPasscode;
    public String currentPasscode;
}
