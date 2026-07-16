using inventory_service.Models;

namespace inventory_service.Repositories;

public interface IRecipeRepository
{
    Task<Recipe?> GetByIdAsync(Guid id);
    Task<List<Recipe>> GetByBusinessIdAsync(Guid businessId);
    Task<List<Recipe>> GetByCategoryIdAsync(Guid categoryId);
    Task<Recipe> AddAsync(Recipe recipe);
    Task<Recipe> UpdateAsync(Recipe recipe);
    Task DeleteAsync(Guid id);
    Task<RecipeItem?> GetRecipeItemAsync(Guid recipeId, Guid ingredientId);
    Task<List<RecipeItem>> GetRecipeItemsByRecipeIdAsync(Guid recipeId);
    Task<RecipeItem> AddRecipeItemAsync(RecipeItem recipeItem);
    Task DeleteRecipeItemAsync(Guid recipeId, Guid ingredientId);
}
