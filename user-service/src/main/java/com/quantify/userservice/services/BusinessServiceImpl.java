package com.quantify.userservice.services;

import com.quantify.userservice.DTOs.*;
import com.quantify.userservice.mappers.BusinessMapper;
import com.quantify.userservice.models.Business;
import com.quantify.userservice.models.UserRole;
import com.quantify.userservice.repositories.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class BusinessServiceImpl implements BusinessService {

    private final BusinessRepository businessRepository;
    private final UserServiceImpl userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Business createBusiness(CreateBusinessRequest businessRequest) {

        Business business = Business.builder().name(businessRequest.getName()).ownerEmail(businessRequest.getOwnerEmail()).passwordHash(passwordEncoder.encode(businessRequest.getPassword())).type(businessRequest.getType()).build();

        business = businessRepository.save(business);

        CreateUserRequest userRequest = CreateUserRequest.builder().businessId(business.getId()).name(businessRequest.getOwnerName()).role(UserRole.OWNER).build();

        userService.createUser(userRequest);
        return business;
    }

    @Override
    public BusinessDTO getBusinessById(UUID id) {
        return businessRepository.findById(id).map(BusinessMapper::toDto).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
    }

    @Override
    public List<BusinessDTO> getAllBusinesses() {
        return businessRepository.findAll().stream().map(BusinessMapper::toDto).toList();
    }

    @Override
    public BusinessDTO updateBusiness(UUID id, UpdateBusinessDto businessDetails) {
        Business business = businessRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
        business.setName(businessDetails.getName());
        business.setOwnerEmail(businessDetails.getOwnerEmail());
        business.setType(businessDetails.getType());
        business.setName(businessDetails.getName());
        return BusinessMapper.toDto(businessRepository.save(business));
    }

    @Override
    public void updateBusinessPassword(UUID businessId, UpdatePasswordDTO password) {
        Business business = businessRepository.findById(businessId).orElseThrow(() -> new RuntimeException("Business not found with id: " + businessId));

        if (!passwordEncoder.matches(password.getCurrentPasscode(), business.getPasswordHash())) {
            throw new RuntimeException("Current password is incorrect");
        }

        business.setPasswordHash(passwordEncoder.encode(password.getNewPasscode()));
        businessRepository.save(business);
    }

    @Override
    public void deleteBusiness(UUID id) {
        businessRepository.deleteById(id);
    }

    @Override
    public void activateBusiness(UUID id) {
        Business business = businessRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
        business.setIsActive(true);
        businessRepository.save(business);
    }

    @Override
    public void deactivateBusiness(UUID id) {
        Business business = businessRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
        business.setIsActive(false);
        businessRepository.save(business);
    }

    @Override
    public Business getBusinessByOwnerEmail(String ownerEmail) {
        return businessRepository.findByOwnerEmail(ownerEmail).orElseThrow(() -> new RuntimeException("Business not found with email: " + ownerEmail));
    }
}