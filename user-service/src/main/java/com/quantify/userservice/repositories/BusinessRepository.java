package com.quantify.userservice.repositories;

import com.quantify.userservice.models.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BusinessRepository extends JpaRepository<Business, UUID> {

    Optional<Business> findByOwnerEmail(String ownerEmail);
}