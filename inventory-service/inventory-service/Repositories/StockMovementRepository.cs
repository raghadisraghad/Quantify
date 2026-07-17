using inventory_service.Models;
using Microsoft.EntityFrameworkCore;

namespace inventory_service.Repositories;

public class StockMovementRepository : IStockMovementRepository
{
    private readonly AppDbContext _context;

    public StockMovementRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<StockMovement?> GetByIdAsync(Guid id)
    {
        return await _context.StockMovements.FindAsync(id);
    }

    public async Task<List<StockMovement>> GetByIngredientIdAsync(Guid ingredientId)
    {
        return await _context.StockMovements.Where(sm => sm.IngredientId == ingredientId).ToListAsync();
    }

    public async Task<StockMovement> AddAsync(StockMovement stockMovement)
    {
        _context.StockMovements.Add(stockMovement);
        await _context.SaveChangesAsync();
        return stockMovement;
    }
}
