package com.quantify.salesservice.DTOs;

import com.quantify.salesservice.models.PaymentMethod;
import com.quantify.salesservice.models.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private UUID id;
    private UUID businessId;
    private UUID orderId;
    private BigDecimal amount;
    private BigDecimal tenderedAmount;
    private BigDecimal changeAmount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private LocalDateTime transactionDate;
}
