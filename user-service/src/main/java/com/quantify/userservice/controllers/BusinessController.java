package com.quantify.userservice.controllers;

import com.quantify.userservice.DTOs.LoginRequest;
import com.quantify.userservice.models.Business;
import com.quantify.userservice.security.JwtService;
import com.quantify.userservice.services.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/businesses")
@RequiredArgsConstructor
public class BusinessController {

    private final BusinessService businessService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<Business> createBusiness(@RequestBody Business business) {
        return new ResponseEntity<>(businessService.createBusiness(business), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Business> getBusinessById(@PathVariable String id) {
        return ResponseEntity.ok(businessService.getBusinessById(id));
    }

    @GetMapping
    public ResponseEntity<List<Business>> getAllBusinesses() {
        return ResponseEntity.ok(businessService.getAllBusinesses());
    }

    @GetMapping("/email/{ownerEmail}")
    public ResponseEntity<Business> getBusinessByOwnerEmail(@PathVariable String ownerEmail) {
        return ResponseEntity.ok(businessService.getBusinessByOwnerEmail(ownerEmail));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Business> updateBusiness(@PathVariable String id, @RequestBody Business business) {
        return ResponseEntity.ok(businessService.updateBusiness(id, business));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable String id) {
        businessService.deleteBusiness(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateBusiness(@PathVariable String id) {
        businessService.activateBusiness(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateBusiness(@PathVariable String id) {
        businessService.deactivateBusiness(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByOwnerEmail(@RequestParam String ownerEmail) {
        return ResponseEntity.ok(businessService.existsByOwnerEmail(ownerEmail));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Business business = businessService.getBusinessByOwnerEmail(request.getEmail());

        if (business == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email"));
        }

        if (!business.getIsActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Account is deactivated"));
        }

        if (!passwordEncoder.matches(request.getPassword(), business.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid password"));
        }

        String token = jwtService.generateToken(business.getOwnerEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("businessId", business.getId());
        response.put("email", business.getOwnerEmail());
        response.put("businessName", business.getName());
        response.put("type", business.getType());

        return ResponseEntity.ok(response);
    }
}