using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace inventory_service.Models;

[Table("recipe_items")]
public class RecipeItem
{
    [Key]
    [Column("recipe_id", TypeName = "uuid")]
    public Guid RecipeId { get; set; }

    [Column("ingredient_id", TypeName = "uuid")]
    public Guid IngredientId { get; set; }

    [Column("quantity", TypeName = "decimal(12,2)")]
    public decimal Quantity { get; set; }

    [ForeignKey(nameof(RecipeId))]
    public Recipe? Recipe { get; set; }

    [ForeignKey(nameof(IngredientId))]
    public Ingredient? Ingredient { get; set; }
}
