using procurement_service.DTOs;

namespace procurement_service.Services;

public interface IPurchaseOrderService
{
    Task<PurchaseOrderDto> CreateAsync(CreatePurchaseOrderRequest request);
    Task<PurchaseOrderDto?> GetByIdAsync(Guid id);
    Task<List<PurchaseOrderDto>> GetByBusinessIdAsync(Guid businessId);
    Task<PurchaseOrderDto?> UpdateAsync(Guid id, CreatePurchaseOrderRequest request);
    Task DeleteAsync(Guid id);
}
