package com.quantify.userservice.services;

import com.quantify.userservice.models.Business;
import com.quantify.userservice.repositories.BusinessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BusinessServiceImpl implements BusinessService {

    private final BusinessRepository businessRepository;

    @Override
    public Business createBusiness(Business business) {
        return businessRepository.save(business);
    }

    @Override
    public Business getBusinessById(String id) {
        return businessRepository.findById(id).orElseThrow(() -> new RuntimeException("Business not found with id: " + id));
    }

    @Override
    public List<Business> getAllBusinesses() {
        return businessRepository.findAll();
    }

    @Override
    public Business updateBusiness(String id, Business businessDetails) {
        Business business = getBusinessById(id);
        business.setName(businessDetails.getName());
        business.setOwnerEmail(businessDetails.getOwnerEmail());
        business.setPasswordHash(businessDetails.getPasswordHash());
        business.setType(businessDetails.getType());
        business.setIsActive(businessDetails.getIsActive());
        return businessRepository.save(business);
    }

    @Override
    public void deleteBusiness(String id) {
        businessRepository.deleteById(id);
    }

    @Override
    public void activateBusiness(String id) {
        Business business = getBusinessById(id);
        business.setIsActive(true);
        businessRepository.save(business);
    }

    @Override
    public void deactivateBusiness(String id) {
        Business business = getBusinessById(id);
        business.setIsActive(false);
        businessRepository.save(business);
    }

    @Override
    public Business getBusinessByOwnerEmail(String ownerEmail) {
        return businessRepository.findByOwnerEmail(ownerEmail).orElseThrow(() -> new RuntimeException("Business not found with email: " + ownerEmail));
    }

    @Override
    public boolean existsByOwnerEmail(String ownerEmail) {
        return businessRepository.existsByOwnerEmail(ownerEmail);
    }
}