using inventory_service.DTOs;

namespace inventory_service.Services;

public interface IStockMovementService
{
    Task<StockMovementDto> CreateAsync(CreateStockMovementRequest request);
    Task<List<StockMovementDto>> GetByIngredientIdAsync(Guid ingredientId);
}
