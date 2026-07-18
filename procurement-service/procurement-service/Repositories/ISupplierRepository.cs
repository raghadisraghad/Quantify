using procurement_service.Models;

namespace procurement_service.Repositories;

public interface ISupplierRepository
{
    Task<Supplier?> GetByIdAsync(Guid id);
    Task<List<Supplier>> GetByBusinessIdAsync(Guid businessId);
    Task<Supplier> AddAsync(Supplier supplier);
    Task<Supplier> UpdateAsync(Supplier supplier);
    Task DeleteAsync(Guid id);
}
