package com.quantify.salesservice.DTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    @NotNull
    private UUID businessId;

    private String customerName;

    @NotBlank
    private String orderNumber;

    @NotNull
    private BigDecimal totalAmount;

    @NotNull
    private List<CreateOrderItemRequest> items;
}
