using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace procurement_service.Models;

[Table("purchase_orders")]
public class PurchaseOrder
{
    [Key]
    [Column("id", TypeName = "uuid")]
    public Guid Id { get; set; }

    [Required]
    [Column("business_id", TypeName = "uuid")]
    public Guid BusinessId { get; set; }

    [Required]
    [Column("supplier_id", TypeName = "uuid")]
    public Guid SupplierId { get; set; }

    [Required]
    [Column("status")]
    public POStatus Status { get; set; } = POStatus.DRAFT;

    [Column("total_cost_mad", TypeName = "decimal(12,2)")]
    public decimal TotalCostMAD { get; set; }

    [Column("ordered_at")]
    public DateTime OrderedAt { get; set; } = DateTime.UtcNow;

    [Column("received_at")]
    public DateTime? ReceivedAt { get; set; }

    [Column("notes")]
    [StringLength(2000)]
    public string? Notes { get; set; }

    [ForeignKey(nameof(SupplierId))]
    public Supplier? Supplier { get; set; }

    public ICollection<PurchaseOrderItem> Items { get; set; } = new List<PurchaseOrderItem>();
}
