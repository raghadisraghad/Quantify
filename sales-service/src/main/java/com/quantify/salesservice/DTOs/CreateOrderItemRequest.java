package com.quantify.salesservice.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CreateOrderItemRequest {

    @NotBlank
    private String recipeId;

    @NotNull
    private Integer quantity;

    @NotNull
    private BigDecimal unitPrice;
}
