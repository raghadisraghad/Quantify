package com.quantify.salesservice.DTOs;

import com.quantify.salesservice.models.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private UUID id;
    private UUID businessId;
    private String orderNumber;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> items;
    private PaymentDTO payment;
}
