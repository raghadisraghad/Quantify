using inventory_service.DTOs;

namespace inventory_service.Services;

public interface IRecipeService
{
    Task<RecipeDto> CreateAsync(CreateRecipeRequest request);
    Task<RecipeDto?> GetByIdAsync(Guid id);
    Task<List<RecipeDto>> GetByBusinessIdAsync(Guid businessId);
    Task<List<RecipeDto>> GetByCategoryIdAsync(Guid categoryId);
    Task<RecipeDto?> UpdateAsync(Guid id, CreateRecipeRequest request);
    Task DeleteAsync(Guid id);
    Task<RecipeItemDto> AddRecipeItemAsync(Guid recipeId, Guid ingredientId, decimal quantity);
    Task<List<RecipeItemDto>> GetRecipeItemsByRecipeIdAsync(Guid recipeId);
    Task DeleteRecipeItemAsync(Guid recipeId, Guid ingredientId);
}
