using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace inventory_service.Models;

[Table("stock_movements")]
public class StockMovement
{
    [Key]
    [Column("id", TypeName = "uuid")]
    public Guid Id { get; set; }

    [Column("type")]
    public MovementType Type { get; set; }

    [Column("quantity", TypeName = "decimal(12,2)")]
    public decimal Quantity { get; set; }

    [Column("date")]
    public DateTime Date { get; set; } = DateTime.UtcNow;

    [Required]
    [Column("ingredient_id", TypeName = "uuid")]
    public Guid IngredientId { get; set; }

    [ForeignKey(nameof(IngredientId))]
    public Ingredient? Ingredient { get; set; }
}
