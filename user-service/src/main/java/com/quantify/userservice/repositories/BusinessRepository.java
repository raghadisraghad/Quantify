package com.quantify.userservice.repositories;

import com.quantify.userservice.models.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRepository extends JpaRepository<Business, String> {

    Optional<Business> findByOwnerEmail(String ownerEmail);

    boolean existsByOwnerEmail(String ownerEmail);
}