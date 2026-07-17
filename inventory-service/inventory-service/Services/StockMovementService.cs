using inventory_service.DTOs;
using inventory_service.Models;
using inventory_service.Repositories;

namespace inventory_service.Services;

public class StockMovementService : IStockMovementService
{
    private readonly IStockMovementRepository _repository;

    public StockMovementService(IStockMovementRepository repository)
    {
        _repository = repository;
    }

    public async Task<StockMovementDto> CreateAsync(CreateStockMovementRequest request)
    {
        var movement = new StockMovement
        {
            Id = Guid.NewGuid(),
            IngredientId = request.IngredientId,
            Type = request.Type,
            Quantity = request.Quantity,
            Date = DateTime.UtcNow
        };

        var created = await _repository.AddAsync(movement);
        return new StockMovementDto
        {
            Id = created.Id,
            IngredientId = created.IngredientId,
            Type = created.Type,
            Quantity = created.Quantity,
            Date = created.Date
        };
    }

    public async Task<List<StockMovementDto>> GetByIngredientIdAsync(Guid ingredientId)
    {
        var movements = await _repository.GetByIngredientIdAsync(ingredientId);
        return movements.Select(m => new StockMovementDto
        {
            Id = m.Id,
            IngredientId = m.IngredientId,
            Type = m.Type,
            Quantity = m.Quantity,
            Date = m.Date
        }).ToList();
    }
}
