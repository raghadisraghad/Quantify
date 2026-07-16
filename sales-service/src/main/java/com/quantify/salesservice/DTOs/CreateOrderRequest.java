package com.quantify.salesservice.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class CreateOrderRequest {

    @NotNull
    private UUID businessId;

    @NotBlank
    private String orderNumber;

    @NotNull
    private BigDecimal totalAmount;

    @NotNull
    private List<CreateOrderItemRequest> items;
}
