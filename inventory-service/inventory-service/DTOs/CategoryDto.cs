namespace inventory_service.DTOs;

public class CategoryDto
{
    public Guid Id { get; set; }
    public Guid BusinessId { get; set; }
    public string Name { get; set; } = string.Empty;
}
