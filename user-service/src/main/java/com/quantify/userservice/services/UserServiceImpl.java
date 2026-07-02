package com.quantify.userservice.services;

import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;
import com.quantify.userservice.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public User getUserByPin(String pin) {
        String hashedPin = passwordEncoder.encode(pin);
        return userRepository.findByPinCodeHash(hashedPin).orElseThrow(() -> new RuntimeException("User not found with pin: " + pin));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> getUsersByBusinessId(String businessId) {
        return userRepository.findByBusinessId(businessId);
    }

    @Override
    public List<User> getActiveUsersByBusinessId(String businessId) {
        return userRepository.findByBusinessIdAndIsActiveTrue(businessId);
    }

    @Override
    public List<User> getUsersByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

    @Override
    public List<User> getUsersByBusinessIdAndRole(String businessId, UserRole role) {
        return userRepository.findByBusinessIdAndRole(businessId, role);
    }

    @Override
    public User updateUser(String id, User userDetails) {
        User user = getUserById(id);
        user.setName(userDetails.getName());
        user.setPinCodeHash(userDetails.getPinCodeHash());
        user.setRole(userDetails.getRole());
        user.setIsActive(userDetails.getIsActive());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public void activateUser(String id) {
        User user = getUserById(id);
        user.setIsActive(true);
        userRepository.save(user);
    }

    @Override
    public void deactivateUser(String id) {
        User user = getUserById(id);
        user.setIsActive(false);
        userRepository.save(user);
    }

    @Override
    public boolean existsByBusinessIdAndName(String businessId, String name) {
        return userRepository.existsByBusinessIdAndName(businessId, name);
    }
}