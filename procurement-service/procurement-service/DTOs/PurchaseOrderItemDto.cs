namespace procurement_service.DTOs;

public class PurchaseOrderItemDto
{
    public Guid Id { get; set; }
    public Guid PurchaseOrderId { get; set; }
    public Guid IngredientId { get; set; }
    public decimal QuantityOrdered { get; set; }
    public decimal UnitPriceCost { get; set; }
}
