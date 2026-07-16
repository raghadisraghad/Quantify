package com.quantify.salesservice.controllers;

import com.quantify.salesservice.DTOs.CreateOrderRequest;
import com.quantify.salesservice.DTOs.CreatePaymentRequest;
import com.quantify.salesservice.DTOs.OrderDTO;
import com.quantify.salesservice.DTOs.PaymentDTO;
import com.quantify.salesservice.models.OrderStatus;
import com.quantify.salesservice.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        return new ResponseEntity<>(orderService.createOrder(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable UUID id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/business/{businessId}")
    public ResponseEntity<List<OrderDTO>> getOrdersByBusinessId(@PathVariable UUID businessId) {
        return ResponseEntity.ok(orderService.getOrdersByBusinessId(businessId));
    }

    @GetMapping("/business/{businessId}/status/{status}")
    public ResponseEntity<List<OrderDTO>> getOrdersByBusinessIdAndStatus(@PathVariable UUID businessId, @PathVariable OrderStatus status) {
        return ResponseEntity.ok(orderService.getOrdersByBusinessIdAndStatus(businessId, status));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(@PathVariable UUID id, @RequestParam OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable UUID id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/payments")
    public ResponseEntity<PaymentDTO> createPayment(@Valid @RequestBody CreatePaymentRequest request) {
        return new ResponseEntity<>(orderService.createPayment(request), HttpStatus.CREATED);
    }

    @GetMapping("/payments/order/{orderId}")
    public ResponseEntity<PaymentDTO> getPaymentByOrderId(@PathVariable UUID orderId) {
        return ResponseEntity.ok(orderService.getPaymentByOrderId(orderId));
    }

    @GetMapping("/payments/business/{businessId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByBusinessId(@PathVariable UUID businessId) {
        return ResponseEntity.ok(orderService.getPaymentsByBusinessId(businessId));
    }
}
