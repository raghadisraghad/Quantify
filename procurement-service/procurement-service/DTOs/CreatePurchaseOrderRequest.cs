namespace procurement_service.DTOs;

public class CreatePurchaseOrderRequest
{
    public Guid BusinessId { get; set; }
    public Guid SupplierId { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal TotalCostMAD { get; set; }
    public DateTime OrderedAt { get; set; }
    public DateTime? ReceivedAt { get; set; }
    public string? Notes { get; set; }
    public List<CreatePurchaseOrderItemRequest> Items { get; set; } = new List<CreatePurchaseOrderItemRequest>();
}
