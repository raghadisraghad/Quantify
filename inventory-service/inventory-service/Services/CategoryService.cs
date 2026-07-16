using inventory_service.DTOs;
using inventory_service.Models;
using inventory_service.Repositories;

namespace inventory_service.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;

    public CategoryService(ICategoryRepository repository)
    {
        _repository = repository;
    }

    public async Task<CategoryDto> CreateAsync(CreateCategoryRequest request)
    {
        var category = new Category
        {
            Id = Guid.NewGuid(),
            BusinessId = request.BusinessId,
            Name = request.Name
        };

        var created = await _repository.AddAsync(category);
        return MapToDto(created);
    }

    public async Task<CategoryDto?> GetByIdAsync(Guid id)
    {
        var category = await _repository.GetByIdAsync(id);
        return category is null ? null : MapToDto(category);
    }

    public async Task<List<CategoryDto>> GetByBusinessIdAsync(Guid businessId)
    {
        var categories = await _repository.GetByBusinessIdAsync(businessId);
        return categories.Select(MapToDto).ToList();
    }

    public async Task<CategoryDto?> UpdateAsync(Guid id, CreateCategoryRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.Name = request.Name;

        var updated = await _repository.UpdateAsync(existing);
        return MapToDto(updated);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    private static CategoryDto MapToDto(Category category) => new()
    {
        Id = category.Id,
        BusinessId = category.BusinessId,
        Name = category.Name
    };
}
