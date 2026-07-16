using inventory_service.Models;

namespace inventory_service.Repositories;

public interface IIngredientRepository
{
    Task<Ingredient?> GetByIdAsync(Guid id);
    Task<List<Ingredient>> GetByBusinessIdAsync(Guid businessId);
    Task<Ingredient> AddAsync(Ingredient ingredient);
    Task<Ingredient> UpdateAsync(Ingredient ingredient);
    Task DeleteAsync(Guid id);
}
