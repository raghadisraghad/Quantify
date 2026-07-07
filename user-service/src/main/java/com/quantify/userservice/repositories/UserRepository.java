package com.quantify.userservice.repositories;

import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    List<User> findByBusinessId(String businessId);

    List<User> findByBusinessIdAndIsActiveTrue(String businessId);

    List<User> findByRole(UserRole role);

    List<User> findByBusinessIdAndRole(String businessId, UserRole role);

    boolean existsByBusinessIdAndName(String businessId, String name);

    Optional<User> findByPinCodeHash(String pinCodeHash);
}