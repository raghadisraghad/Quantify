using inventory_service.Models;

namespace inventory_service.DTOs;

public class StockMovementDto
{
    public Guid Id { get; set; }
    public MovementType Type { get; set; }
    public decimal Quantity { get; set; }
    public DateTime Date { get; set; }
    public Guid IngredientId { get; set; }
}
