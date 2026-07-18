namespace procurement_service.DTOs;

public class PurchaseOrderDto
{
    public Guid Id { get; set; }
    public Guid BusinessId { get; set; }
    public Guid SupplierId { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal TotalCostMAD { get; set; }
    public DateTime OrderedAt { get; set; }
    public DateTime? ReceivedAt { get; set; }
    public string? Notes { get; set; }
    public List<PurchaseOrderItemDto> Items { get; set; } = new List<PurchaseOrderItemDto>();
}
