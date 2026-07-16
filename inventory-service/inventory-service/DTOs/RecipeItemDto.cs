namespace inventory_service.DTOs;

public class RecipeItemDto
{
    public Guid RecipeId { get; set; }
    public Guid IngredientId { get; set; }
    public decimal Quantity { get; set; }
}
