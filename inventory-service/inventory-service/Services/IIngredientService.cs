using inventory_service.DTOs;

namespace inventory_service.Services;

public interface IIngredientService
{
    Task<IngredientDto> CreateAsync(CreateIngredientRequest request);
    Task<IngredientDto?> GetByIdAsync(Guid id);
    Task<List<IngredientDto>> GetByBusinessIdAsync(Guid businessId);
    Task<IngredientDto?> UpdateAsync(Guid id, CreateIngredientRequest request);
    Task DeleteAsync(Guid id);
}
