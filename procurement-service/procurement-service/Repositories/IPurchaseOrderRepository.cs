using procurement_service.Models;

namespace procurement_service.Repositories;

public interface IPurchaseOrderRepository
{
    Task<PurchaseOrder?> GetByIdAsync(Guid id);
    Task<List<PurchaseOrder>> GetByBusinessIdAsync(Guid businessId);
    Task<PurchaseOrder> AddAsync(PurchaseOrder purchaseOrder);
    Task<PurchaseOrder> UpdateAsync(PurchaseOrder purchaseOrder);
    Task DeleteAsync(Guid id);
}
