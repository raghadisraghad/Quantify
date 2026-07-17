using inventory_service.DTOs;

namespace inventory_service.Services;

public interface ICategoryService
{
    Task<CategoryDto> CreateAsync(CreateCategoryRequest request);
    Task<CategoryDto?> GetByIdAsync(Guid id);
    Task<List<CategoryDto>> GetByBusinessIdAsync(Guid businessId);
    Task<CategoryDto?> UpdateAsync(Guid id, CreateCategoryRequest request);
    Task DeleteAsync(Guid id);
}
