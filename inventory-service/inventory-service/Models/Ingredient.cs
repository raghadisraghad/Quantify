using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace inventory_service.Models;

[Table("ingredients")]
public class Ingredient
{
    [Key]
    [Column("id", TypeName = "uuid")]
    public Guid Id { get; set; }

    [Required]
    [Column("business_id", TypeName = "uuid")]
    public Guid BusinessId { get; set; }

    [Required]
    [Column("name")]
    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [Column("picture")]
    [StringLength(1000)]
    public string? Picture { get; set; }

    [Required]
    [Column("unit")]
    [StringLength(100)]
    public string Unit { get; set; } = string.Empty;

    [Column("cost_per_unit", TypeName = "decimal(12,2)")]
    public decimal CostPerUnit { get; set; }

    [Column("current_quantity", TypeName = "decimal(12,2)")]
    public decimal CurrentQuantity { get; set; }

    [Column("min_threshold", TypeName = "decimal(12,2)")]
    public decimal MinThreshold { get; set; }

    public ICollection<RecipeItem> RecipeItems { get; set; } = new List<RecipeItem>();
    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
