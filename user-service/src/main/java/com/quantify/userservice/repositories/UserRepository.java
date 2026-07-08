package com.quantify.userservice.repositories;

import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    List<User> findByBusinessId(UUID businessId);

    List<User> findByBusinessIdAndIsActiveTrue(UUID businessId);

    List<User> findByRole(UserRole role);

    boolean existsByBusinessIdAndName(UUID businessId, String name);
}