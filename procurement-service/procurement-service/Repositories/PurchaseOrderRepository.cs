using Microsoft.EntityFrameworkCore;
using procurement_service.Models;

namespace procurement_service.Repositories;

public class PurchaseOrderRepository : IPurchaseOrderRepository
{
    private readonly AppDbContext _context;

    public PurchaseOrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PurchaseOrder?> GetByIdAsync(Guid id)
    {
        return await _context.PurchaseOrders
            .Include(po => po.Items)
            .FirstOrDefaultAsync(po => po.Id == id);
    }

    public async Task<List<PurchaseOrder>> GetByBusinessIdAsync(Guid businessId)
    {
        return await _context.PurchaseOrders
            .Include(po => po.Items)
            .Where(po => po.BusinessId == businessId)
            .ToListAsync();
    }

    public async Task<PurchaseOrder> AddAsync(PurchaseOrder purchaseOrder)
    {
        _context.PurchaseOrders.Add(purchaseOrder);
        await _context.SaveChangesAsync();
        return purchaseOrder;
    }

    public async Task<PurchaseOrder> UpdateAsync(PurchaseOrder purchaseOrder)
    {
        _context.PurchaseOrders.Update(purchaseOrder);
        await _context.SaveChangesAsync();
        return purchaseOrder;
    }

    public async Task DeleteAsync(Guid id)
    {
        var purchaseOrder = await _context.PurchaseOrders.FindAsync(id);
        if (purchaseOrder is not null)
        {
            _context.PurchaseOrders.Remove(purchaseOrder);
            await _context.SaveChangesAsync();
        }
    }
}
