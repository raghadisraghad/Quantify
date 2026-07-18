using procurement_service.DTOs;
using procurement_service.Models;
using procurement_service.Repositories;

namespace procurement_service.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _repository;

    public SupplierService(ISupplierRepository repository)
    {
        _repository = repository;
    }

    public async Task<SupplierDto> CreateAsync(CreateSupplierRequest request)
    {
        var supplier = new Supplier
        {
            Id = Guid.NewGuid(),
            BusinessId = request.BusinessId,
            Name = request.Name,
            ContactName = request.ContactName,
            Email = request.Email,
            Phone = request.Phone,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.AddAsync(supplier);
        return MapToDto(created);
    }

    public async Task<SupplierDto?> GetByIdAsync(Guid id)
    {
        var supplier = await _repository.GetByIdAsync(id);
        return supplier is null ? null : MapToDto(supplier);
    }

    public async Task<List<SupplierDto>> GetByBusinessIdAsync(Guid businessId)
    {
        var suppliers = await _repository.GetByBusinessIdAsync(businessId);
        return suppliers.Select(MapToDto).ToList();
    }

    public async Task<SupplierDto?> UpdateAsync(Guid id, CreateSupplierRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.Name = request.Name;
        existing.ContactName = request.ContactName;
        existing.Email = request.Email;
        existing.Phone = request.Phone;
        existing.IsActive = request.IsActive;

        var updated = await _repository.UpdateAsync(existing);
        return MapToDto(updated);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    private static SupplierDto MapToDto(Supplier supplier) => new()
    {
        Id = supplier.Id,
        BusinessId = supplier.BusinessId,
        Name = supplier.Name,
        ContactName = supplier.ContactName,
        Email = supplier.Email,
        Phone = supplier.Phone,
        IsActive = supplier.IsActive,
        CreatedAt = supplier.CreatedAt
    };
}
