using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace procurement_service.Models;

[Table("purchase_order_items")]
public class PurchaseOrderItem
{
    [Key]
    [Column("id", TypeName = "uuid")]
    public Guid Id { get; set; }

    [Required]
    [Column("purchase_order_id", TypeName = "uuid")]
    public Guid PurchaseOrderId { get; set; }

    [Required]
    [Column("ingredient_id", TypeName = "uuid")]
    public Guid IngredientId { get; set; }

    [Column("quantity_ordered", TypeName = "decimal(12,2)")]
    public decimal QuantityOrdered { get; set; }

    [Column("unit_price_cost", TypeName = "decimal(12,2)")]
    public decimal UnitPriceCost { get; set; }

    [ForeignKey(nameof(PurchaseOrderId))]
    public PurchaseOrder? PurchaseOrder { get; set; }
}
