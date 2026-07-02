package com.quantify.userservice.services;

import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;

import java.util.List;

public interface UserService {
    User createUser(User user);

    User getUserById(String id);

    User getUserByPin(String pin);

    List<User> getAllUsers();

    List<User> getUsersByBusinessId(String businessId);

    List<User> getActiveUsersByBusinessId(String businessId);

    List<User> getUsersByRole(UserRole role);

    List<User> getUsersByBusinessIdAndRole(String businessId, UserRole role);

    User updateUser(String id, User userDetails);

    void deleteUser(String id);

    void activateUser(String id);

    void deactivateUser(String id);

    boolean existsByBusinessIdAndName(String businessId, String name);
}