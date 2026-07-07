package com.quantify.userservice.controllers;

import com.quantify.userservice.DTOs.LoginRequest;
import com.quantify.userservice.models.User;
import com.quantify.userservice.models.UserRole;
import com.quantify.userservice.security.JwtService;
import com.quantify.userservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<User>> getUsersByBusinessId(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUsersByBusinessId(userId));
    }

    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<User>> getActiveUsersByBusinessId(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getActiveUsersByBusinessId(userId));
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable UserRole role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @GetMapping("/user/{userId}/role/{role}")
    public ResponseEntity<List<User>> getUsersByBusinessIdAndRole(@PathVariable String userId, @PathVariable UserRole role) {
        return ResponseEntity.ok(userService.getUsersByBusinessIdAndRole(userId, role));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable String id) {
        userService.activateUser(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable String id) {
        userService.deactivateUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByBusinessIdAndName(@RequestParam String userId, @RequestParam String name) {
        return ResponseEntity.ok(userService.existsByBusinessIdAndName(userId, name));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.getUserByPin(request.getPin());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid pin"));
        }

        if (!user.getIsActive()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User is deactivated"));
        }

        if (!passwordEncoder.matches(request.getPin(), user.getPinCodeHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid pin"));
        }

        String token = jwtService.generateToken(user.getName());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId());
        response.put("businessId", user.getBusinessId());
        response.put("userName", user.getName());
        response.put("role", user.getRole());

        return ResponseEntity.ok(response);
    }
}