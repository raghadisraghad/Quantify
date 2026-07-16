package com.quantify.salesservice.repositories;

import com.quantify.salesservice.models.Order;
import com.quantify.salesservice.models.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByBusinessId(UUID businessId);

    List<Order> findByBusinessIdAndStatus(UUID businessId, OrderStatus status);

    List<Order> findByStatus(OrderStatus status);
}
