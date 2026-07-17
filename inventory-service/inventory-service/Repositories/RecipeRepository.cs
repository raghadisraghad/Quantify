using inventory_service.Models;
using Microsoft.EntityFrameworkCore;

namespace inventory_service.Repositories;

public class RecipeRepository : IRecipeRepository
{
    private readonly AppDbContext _context;

    public RecipeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Recipe?> GetByIdAsync(Guid id)
    {
        return await _context.Recipes.FindAsync(id);
    }

    public async Task<List<Recipe>> GetByBusinessIdAsync(Guid businessId)
    {
        return await _context.Recipes.Where(r => r.BusinessId == businessId).ToListAsync();
    }

    public async Task<List<Recipe>> GetByCategoryIdAsync(Guid categoryId)
    {
        return await _context.Recipes.Where(r => r.CategoryId == categoryId).ToListAsync();
    }

    public async Task<Recipe> AddAsync(Recipe recipe)
    {
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task<Recipe> UpdateAsync(Recipe recipe)
    {
        _context.Recipes.Update(recipe);
        await _context.SaveChangesAsync();
        return recipe;
    }

    public async Task DeleteAsync(Guid id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe is not null)
        {
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<RecipeItem?> GetRecipeItemAsync(Guid recipeId, Guid ingredientId)
    {
        return await _context.RecipeItems.FindAsync(recipeId, ingredientId);
    }

    public async Task<List<RecipeItem>> GetRecipeItemsByRecipeIdAsync(Guid recipeId)
    {
        return await _context.RecipeItems.Where(ri => ri.RecipeId == recipeId).ToListAsync();
    }

    public async Task<RecipeItem> AddRecipeItemAsync(RecipeItem recipeItem)
    {
        _context.RecipeItems.Add(recipeItem);
        await _context.SaveChangesAsync();
        return recipeItem;
    }

    public async Task DeleteRecipeItemAsync(Guid recipeId, Guid ingredientId)
    {
        var item = await _context.RecipeItems.FindAsync(recipeId, ingredientId);
        if (item is not null)
        {
            _context.RecipeItems.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}
