using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace inventory_service.Models;

[Table("recipes")]
public class Recipe
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

    [Column("category_id", TypeName = "uuid")]
    public Guid? CategoryId { get; set; }

    [Column("price", TypeName = "decimal(12,2)")]
    public decimal Price { get; set; }

    [Column("status")]
    public RecipeStatus Status { get; set; } = RecipeStatus.ACTIVE;

    [ForeignKey(nameof(CategoryId))]
    public Category? Category { get; set; }

    public ICollection<RecipeItem> RecipeItems { get; set; } = new List<RecipeItem>();
}
