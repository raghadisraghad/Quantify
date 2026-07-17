using inventory_service.DTOs;
using inventory_service.Models;
using inventory_service.Repositories;

namespace inventory_service.Services;

public class RecipeService : IRecipeService
{
    private readonly IRecipeRepository _repository;

    public RecipeService(IRecipeRepository repository)
    {
        _repository = repository;
    }

    public async Task<RecipeDto> CreateAsync(CreateRecipeRequest request)
    {
        var recipe = new Recipe
        {
            Id = Guid.NewGuid(),
            BusinessId = request.BusinessId,
            Name = request.Name,
            Picture = request.Picture,
            CategoryId = request.CategoryId,
            Price = request.Price,
            Status = request.Status
        };

        var created = await _repository.AddAsync(recipe);
        return MapToDto(created);
    }

    public async Task<RecipeDto?> GetByIdAsync(Guid id)
    {
        var recipe = await _repository.GetByIdAsync(id);
        return recipe is null ? null : MapToDto(recipe);
    }

    public async Task<List<RecipeDto>> GetByBusinessIdAsync(Guid businessId)
    {
        var recipes = await _repository.GetByBusinessIdAsync(businessId);
        return recipes.Select(MapToDto).ToList();
    }

    public async Task<List<RecipeDto>> GetByCategoryIdAsync(Guid categoryId)
    {
        var recipes = await _repository.GetByCategoryIdAsync(categoryId);
        return recipes.Select(MapToDto).ToList();
    }

    public async Task<RecipeDto?> UpdateAsync(Guid id, CreateRecipeRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.Name = request.Name;
        existing.Picture = request.Picture;
        existing.CategoryId = request.CategoryId;
        existing.Price = request.Price;
        existing.Status = request.Status;

        var updated = await _repository.UpdateAsync(existing);
        return MapToDto(updated);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    public async Task<RecipeItemDto> AddRecipeItemAsync(Guid recipeId, Guid ingredientId, decimal quantity)
    {
        var recipeItem = new RecipeItem
        {
            RecipeId = recipeId,
            IngredientId = ingredientId,
            Quantity = quantity
        };

        var created = await _repository.AddRecipeItemAsync(recipeItem);
        return new RecipeItemDto
        {
            RecipeId = created.RecipeId,
            IngredientId = created.IngredientId,
            Quantity = created.Quantity
        };
    }

    public async Task<List<RecipeItemDto>> GetRecipeItemsByRecipeIdAsync(Guid recipeId)
    {
        var items = await _repository.GetRecipeItemsByRecipeIdAsync(recipeId);
        return items.Select(item => new RecipeItemDto
        {
            RecipeId = item.RecipeId,
            IngredientId = item.IngredientId,
            Quantity = item.Quantity
        }).ToList();
    }

    public async Task DeleteRecipeItemAsync(Guid recipeId, Guid ingredientId)
    {
        await _repository.DeleteRecipeItemAsync(recipeId, ingredientId);
    }

    private static RecipeDto MapToDto(Recipe recipe) => new()
    {
        Id = recipe.Id,
        BusinessId = recipe.BusinessId,
        Name = recipe.Name,
        Picture = recipe.Picture,
        CategoryId = recipe.CategoryId,
        Price = recipe.Price,
        Status = recipe.Status
    };
}
