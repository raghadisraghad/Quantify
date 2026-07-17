using inventory_service.Models;

namespace inventory_service.Repositories;

public interface IStockMovementRepository
{
    Task<StockMovement?> GetByIdAsync(Guid id);
    Task<List<StockMovement>> GetByIngredientIdAsync(Guid ingredientId);
    Task<StockMovement> AddAsync(StockMovement stockMovement);
}
