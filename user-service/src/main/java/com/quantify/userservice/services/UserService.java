package com.quantify.userservice.services;

import com.quantify.userservice.DTOs.*;
import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;

import java.util.List;
import java.util.UUID;

public interface UserService {
    CreateUserResponse createUser(CreateUserRequest user);

    UserDTO getUserById(UUID id);

    User getUserLogin(UserLoginRequest request);

    List<UserDTO> getAllUsers();

    List<UserDTO> getUsersByBusinessId(UUID businessId);

    List<UserDTO> getActiveUsersByBusinessId(UUID businessId);

    List<UserDTO> getUsersByRole(UserRole role);

    UserDTO updateUser(UUID id, UpdateUserDto userDetails);

    void updateUserPassword(UUID userId, UpdatePasswordDTO password);

    void deleteUser(UUID id);

    void activateUser(UUID id);

    void deactivateUser(UUID id);
}