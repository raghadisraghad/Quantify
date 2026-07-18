package com.quantify.salesservice.services;

import com.quantify.salesservice.DTOs.CreateOrderRequest;
import com.quantify.salesservice.DTOs.CreatePaymentRequest;
import com.quantify.salesservice.DTOs.OrderDTO;
import com.quantify.salesservice.DTOs.PaymentDTO;
import com.quantify.salesservice.models.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface OrderService {

    OrderDTO createOrder(CreateOrderRequest request);

    OrderDTO getOrderById(UUID id);

    List<OrderDTO> getOrdersByBusinessId(UUID businessId);

    List<OrderDTO> getOrdersByBusinessIdAndStatus(UUID businessId, OrderStatus status);

    List<OrderDTO> getAllOrders();

    Page<OrderDTO> searchOrders(UUID businessId, String q, OrderStatus status, Pageable pageable);

    OrderDTO updateOrderStatus(UUID id, OrderStatus status);

    PaymentDTO createPayment(CreatePaymentRequest request);

    PaymentDTO getPaymentByOrderId(UUID orderId);

    List<PaymentDTO> getPaymentsByBusinessId(UUID businessId);

    void deleteOrder(UUID id);
}
