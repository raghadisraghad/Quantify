namespace inventory_service.DTOs;

public class CreateIngredientRequest
{
    public Guid BusinessId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Picture { get; set; }
    public string Unit { get; set; } = string.Empty;
    public decimal CostPerUnit { get; set; }
    public decimal CurrentQuantity { get; set; }
    public decimal MinThreshold { get; set; }
}
