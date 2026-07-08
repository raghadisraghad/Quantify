package com.quantify.userservice.services;

import com.quantify.userservice.DTOs.BusinessDTO;
import com.quantify.userservice.DTOs.CreateBusinessRequest;
import com.quantify.userservice.DTOs.UpdateBusinessDto;
import com.quantify.userservice.DTOs.UpdatePasswordDTO;
import com.quantify.userservice.models.Business;

import java.util.List;
import java.util.UUID;

public interface BusinessService {
    Business createBusiness(CreateBusinessRequest businessRequest);

    BusinessDTO getBusinessById(UUID id);

    List<BusinessDTO> getAllBusinesses();

    BusinessDTO updateBusiness(UUID id, UpdateBusinessDto businessDetails);

    void updateBusinessPassword(UUID businessId, UpdatePasswordDTO password);

    void deleteBusiness(UUID id);

    void activateBusiness(UUID id);

    void deactivateBusiness(UUID id);

    Business getBusinessByOwnerEmail(String ownerEmail);
}