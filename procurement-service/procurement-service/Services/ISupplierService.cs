using procurement_service.DTOs;

namespace procurement_service.Services;

public interface ISupplierService
{
    Task<SupplierDto> CreateAsync(CreateSupplierRequest request);
    Task<SupplierDto?> GetByIdAsync(Guid id);
    Task<List<SupplierDto>> GetByBusinessIdAsync(Guid businessId);
    Task<SupplierDto?> UpdateAsync(Guid id, CreateSupplierRequest request);
    Task DeleteAsync(Guid id);
}
