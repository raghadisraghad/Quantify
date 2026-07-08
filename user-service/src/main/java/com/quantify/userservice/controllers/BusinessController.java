package com.quantify.userservice.controllers;

import com.quantify.userservice.DTOs.*;
import com.quantify.userservice.mappers.BusinessMapper;
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
import java.util.UUID;

@RestController
@RequestMapping("/api/businesses")
@RequiredArgsConstructor
public class BusinessController {

    private final BusinessService businessService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Business> createBusiness(@RequestBody CreateBusinessRequest businessRequest) {
        return new ResponseEntity<>(businessService.createBusiness(businessRequest), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessDTO> getBusinessById(@PathVariable UUID id) {
        return ResponseEntity.ok(businessService.getBusinessById(id));
    }

    @GetMapping
    public ResponseEntity<List<BusinessDTO>> getAllBusinesses() {
        return ResponseEntity.ok(businessService.getAllBusinesses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessDTO> updateBusiness(@PathVariable UUID id, @RequestBody UpdateBusinessDto business) {
        return ResponseEntity.ok(businessService.updateBusiness(id, business));
    }

    @PatchMapping("/{businessId}/password")
    public ResponseEntity<Void> updateBusiness(@PathVariable UUID businessId, @RequestBody UpdatePasswordDTO password) {
        businessService.updateBusinessPassword(businessId, password);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBusiness(@PathVariable UUID id) {
        businessService.deleteBusiness(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateBusiness(@PathVariable UUID id) {
        businessService.activateBusiness(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<Void> deactivateBusiness(@PathVariable UUID id) {
        businessService.deactivateBusiness(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody BusinessLoginRequest request) {
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