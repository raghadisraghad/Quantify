namespace procurement_service.DTOs;

public class CreatePurchaseOrderItemRequest
{
    public Guid IngredientId { get; set; }
    public decimal QuantityOrdered { get; set; }
    public decimal UnitPriceCost { get; set; }
}
