package com.quantify.salesservice.DTOs;

import com.quantify.salesservice.models.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class CreatePaymentRequest {

    @NotNull
    private UUID businessId;

    @NotNull
    private UUID orderId;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private BigDecimal tenderedAmount;

    @NotNull
    private PaymentMethod paymentMethod;
}
