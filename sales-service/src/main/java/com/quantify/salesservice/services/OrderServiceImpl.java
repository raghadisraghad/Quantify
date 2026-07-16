package com.quantify.salesservice.services;

import com.quantify.salesservice.DTOs.*;
import com.quantify.salesservice.models.Order;
import com.quantify.salesservice.models.OrderItem;
import com.quantify.salesservice.models.OrderStatus;
import com.quantify.salesservice.models.Payment;
import com.quantify.salesservice.models.PaymentMethod;
import com.quantify.salesservice.models.PaymentStatus;
import com.quantify.salesservice.repositories.OrderItemRepository;
import com.quantify.salesservice.repositories.OrderRepository;
import com.quantify.salesservice.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public OrderDTO createOrder(CreateOrderRequest request) {
        Order order = Order.builder()
                .businessId(request.getBusinessId())
                .orderNumber(request.getOrderNumber())
                .totalAmount(request.getTotalAmount())
                .status(OrderStatus.PENDING)
                .build();

        Order savedOrder = orderRepository.save(order);

        if (request.getItems() != null) {
            for (CreateOrderItemRequest itemRequest : request.getItems()) {
                OrderItem item = OrderItem.builder()
                        .orderId(savedOrder.getId())
                        .recipeId(itemRequest.getRecipeId())
                        .quantity(itemRequest.getQuantity())
                        .unitPrice(itemRequest.getUnitPrice())
                        .build();
                orderItemRepository.save(item);
            }
        }

        return toDto(savedOrder);
    }

    @Override
    public OrderDTO getOrderById(UUID id) {
        return orderRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Override
    public List<OrderDTO> getOrdersByBusinessId(UUID businessId) {
        return orderRepository.findByBusinessId(businessId).stream().map(this::toDto).toList();
    }

    @Override
    public List<OrderDTO> getOrdersByBusinessIdAndStatus(UUID businessId, OrderStatus status) {
        return orderRepository.findByBusinessIdAndStatus(businessId, status).stream().map(this::toDto).toList();
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(this::toDto).toList();
    }

    @Override
    public OrderDTO updateOrderStatus(UUID id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(status);
        return toDto(orderRepository.save(order));
    }

    @Override
    public PaymentDTO createPayment(CreatePaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

        BigDecimal changeAmount = request.getTenderedAmount().subtract(request.getAmount());

        Payment payment = Payment.builder()
                .businessId(request.getBusinessId())
                .orderId(request.getOrderId())
                .amount(request.getAmount())
                .tenderedAmount(request.getTenderedAmount())
                .changeAmount(changeAmount)
                .paymentMethod(request.getPaymentMethod())
                .status(PaymentStatus.SUCCESS)
                .build();

        Payment savedPayment = paymentRepository.save(payment);
        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        return toDto(savedPayment);
    }

    @Override
    public PaymentDTO getPaymentByOrderId(UUID orderId) {
        return paymentRepository.findByOrderId(orderId).stream().findFirst()
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Payment not found for order id: " + orderId));
    }

    @Override
    public List<PaymentDTO> getPaymentsByBusinessId(UUID businessId) {
        return paymentRepository.findByBusinessId(businessId).stream().map(this::toDto).toList();
    }

    @Override
    public void deleteOrder(UUID id) {
        orderRepository.deleteById(id);
    }

    private OrderDTO toDto(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .businessId(order.getBusinessId())
                .orderNumber(order.getOrderNumber())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(order.getOrderItems().stream().map(this::toDto).toList())
                .payment(order.getPayment() != null ? toDto(order.getPayment()) : null)
                .build();
    }

    private OrderItemDTO toDto(OrderItem item) {
        return OrderItemDTO.builder()
                .id(item.getId())
                .orderId(item.getOrderId())
                .recipeId(item.getRecipeId())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .build();
    }

    private PaymentDTO toDto(Payment payment) {
        return PaymentDTO.builder()
                .id(payment.getId())
                .businessId(payment.getBusinessId())
                .orderId(payment.getOrderId())
                .amount(payment.getAmount())
                .tenderedAmount(payment.getTenderedAmount())
                .changeAmount(payment.getChangeAmount())
                .paymentMethod(payment.getPaymentMethod())
                .status(payment.getStatus())
                .transactionDate(payment.getTransactionDate())
                .build();
    }
}
