package com.quantify.userservice.services;

import com.quantify.userservice.models.Business;

import java.util.List;

public interface BusinessService {
    Business createBusiness(Business business);

    Business getBusinessById(String id);

    List<Business> getAllBusinesses();

    Business updateBusiness(String id, Business businessDetails);

    void deleteBusiness(String id);

    void activateBusiness(String id);

    void deactivateBusiness(String id);

    Business getBusinessByOwnerEmail(String ownerEmail);

    boolean existsByOwnerEmail(String ownerEmail);
}