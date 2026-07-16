using inventory_service.Models;
using Microsoft.EntityFrameworkCore;

namespace inventory_service.Repositories;

public class IngredientRepository : IIngredientRepository
{
    private readonly AppDbContext _context;

    public IngredientRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Ingredient?> GetByIdAsync(Guid id)
    {
        return await _context.Ingredients.FindAsync(id);
    }

    public async Task<List<Ingredient>> GetByBusinessIdAsync(Guid businessId)
    {
        return await _context.Ingredients.Where(i => i.BusinessId == businessId).ToListAsync();
    }

    public async Task<Ingredient> AddAsync(Ingredient ingredient)
    {
        _context.Ingredients.Add(ingredient);
        await _context.SaveChangesAsync();
        return ingredient;
    }

    public async Task<Ingredient> UpdateAsync(Ingredient ingredient)
    {
        _context.Ingredients.Update(ingredient);
        await _context.SaveChangesAsync();
        return ingredient;
    }

    public async Task DeleteAsync(Guid id)
    {
        var ingredient = await _context.Ingredients.FindAsync(id);
        if (ingredient is not null)
        {
            _context.Ingredients.Remove(ingredient);
            await _context.SaveChangesAsync();
        }
    }
}
