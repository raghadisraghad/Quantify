using inventory_service.DTOs;
using inventory_service.Models;
using inventory_service.Repositories;

namespace inventory_service.Services;

public class IngredientService : IIngredientService
{
    private readonly IIngredientRepository _repository;

    public IngredientService(IIngredientRepository repository)
    {
        _repository = repository;
    }

    public async Task<IngredientDto> CreateAsync(CreateIngredientRequest request)
    {
        var ingredient = new Ingredient
        {
            Id = Guid.NewGuid(),
            BusinessId = request.BusinessId,
            Name = request.Name,
            Picture = request.Picture,
            Unit = request.Unit,
            CostPerUnit = request.CostPerUnit,
            CurrentQuantity = request.CurrentQuantity,
            MinThreshold = request.MinThreshold
        };

        var created = await _repository.AddAsync(ingredient);
        return MapToDto(created);
    }

    public async Task<IngredientDto?> GetByIdAsync(Guid id)
    {
        var ingredient = await _repository.GetByIdAsync(id);
        return ingredient is null ? null : MapToDto(ingredient);
    }

    public async Task<List<IngredientDto>> GetByBusinessIdAsync(Guid businessId)
    {
        var ingredients = await _repository.GetByBusinessIdAsync(businessId);
        return ingredients.Select(MapToDto).ToList();
    }

    public async Task<IngredientDto?> UpdateAsync(Guid id, CreateIngredientRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.Name = request.Name;
        existing.Picture = request.Picture;
        existing.Unit = request.Unit;
        existing.CostPerUnit = request.CostPerUnit;
        existing.CurrentQuantity = request.CurrentQuantity;
        existing.MinThreshold = request.MinThreshold;

        var updated = await _repository.UpdateAsync(existing);
        return MapToDto(updated);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    private static IngredientDto MapToDto(Ingredient ingredient) => new()
    {
        Id = ingredient.Id,
        BusinessId = ingredient.BusinessId,
        Name = ingredient.Name,
        Picture = ingredient.Picture,
        Unit = ingredient.Unit,
        CostPerUnit = ingredient.CostPerUnit,
        CurrentQuantity = ingredient.CurrentQuantity,
        MinThreshold = ingredient.MinThreshold
    };
}
