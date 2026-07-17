namespace inventory_service.DTOs;

public class CreateCategoryRequest
{
    public Guid BusinessId { get; set; }
    public string Name { get; set; } = string.Empty;
}
