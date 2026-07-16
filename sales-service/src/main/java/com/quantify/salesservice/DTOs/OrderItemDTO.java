package com.quantify.salesservice.DTOs;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class OrderItemDTO {

    private UUID id;
    private UUID orderId;
    private String recipeId;
    private Integer quantity;
    private BigDecimal unitPrice;
}
