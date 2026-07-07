package com.quantify.userservice.services;

import com.quantify.userservice.DTOs.*;
import com.quantify.userservice.mappers.UserMapper;
import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;
import com.quantify.userservice.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public CreateUserResponse createUser(CreateUserRequest userRequest) {

        String pin = generateUniquePin(userRequest.getBusinessId());

        User user = User.builder().businessId(userRequest.getBusinessId()).name(userRequest.getName()).pinCodeHash(passwordEncoder.encode(pin)).role(userRequest.getRole()).build();

        userRepository.save(user);

        return CreateUserResponse.builder().businessId(user.getBusinessId()).name(user.getName()).pin(pin).role(user.getRole()).build();
    }

    @Override
    public UserDTO getUserById(UUID id) {
        return userRepository.findById(id).map(UserMapper::toDto).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public User getUserLogin(UserLoginRequest request) {
        List<User> users = userRepository.findByBusinessId(request.getBusinessId());

        User user = users.stream().filter(u -> passwordEncoder.matches(request.getPin(), u.getPinCodeHash())).findFirst().orElseThrow(() -> new RuntimeException("Invalid PIN"));

        return user;
    }

    private String generateUniquePin(UUID businessId) {
        List<User> users = userRepository.findByBusinessId(businessId);

        while (true) {
            String pin = String.format("%04d", ThreadLocalRandom.current().nextInt(10000));

            boolean exists = users.stream().anyMatch(u -> passwordEncoder.matches(pin, u.getPinCodeHash()));

            if (!exists) {
                return pin;
            }
        }
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(UserMapper::toDto).toList();
    }

    @Override
    public List<UserDTO> getUsersByBusinessId(UUID businessId) {
        return userRepository.findByBusinessId(businessId).stream().map(UserMapper::toDto).toList();
    }

    @Override
    public List<UserDTO> getActiveUsersByBusinessId(UUID businessId) {
        return userRepository.findByBusinessIdAndIsActiveTrue(businessId).stream().map(UserMapper::toDto).toList();
    }

    @Override
    public List<UserDTO> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role).stream().map(UserMapper::toDto).toList();
    }

    @Override
    public UserDTO updateUser(UUID id, UpdateUserDto userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setName(userDetails.getName());
        user.setRole(userDetails.getRole());
        return UserMapper.toDto(userRepository.save(user));
    }

    @Override
    public void updateUserPassword(UUID userId, UpdatePasswordDTO password) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (!passwordEncoder.matches(password.getCurrentPasscode(), user.getPinCodeHash())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPinCodeHash(passwordEncoder.encode(password.getNewPasscode()));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public void activateUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
        user.setIsActive(true);
        userRepository.save(user);
    }

    @Override
    public void deactivateUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
        user.setIsActive(false);
        userRepository.save(user);
    }
}