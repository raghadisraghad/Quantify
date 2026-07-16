using inventory_service.Models;

namespace inventory_service.DTOs;

public class CreateStockMovementRequest
{
    public Guid IngredientId { get; set; }
    public MovementType Type { get; set; }
    public decimal Quantity { get; set; }
}
