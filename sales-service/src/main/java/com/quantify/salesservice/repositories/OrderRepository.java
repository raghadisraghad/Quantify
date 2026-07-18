package com.quantify.salesservice.repositories;

import com.quantify.salesservice.models.Order;
import com.quantify.salesservice.models.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByBusinessId(UUID businessId);

    List<Order> findByBusinessIdAndStatus(UUID businessId, OrderStatus status);

    List<Order> findByStatus(OrderStatus status);

    @Query("SELECT o FROM Order o WHERE o.businessId = :businessId " +
           "AND (:q IS NULL OR LOWER(o.orderNumber) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(COALESCE(o.customerName,'')) LIKE LOWER(CONCAT('%', :q, '%'))) " +
           "AND (:status IS NULL OR o.status = :status) " +
           "ORDER BY o.createdAt DESC")
    Page<Order> searchByBusinessId(@Param("businessId") UUID businessId,
                                   @Param("q") String q,
                                   @Param("status") OrderStatus status,
                                   Pageable pageable);
}
