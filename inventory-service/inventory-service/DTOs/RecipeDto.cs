using inventory_service.Models;

namespace inventory_service.DTOs;

public class RecipeDto
{
    public Guid Id { get; set; }
    public Guid BusinessId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Picture { get; set; }
    public Guid? CategoryId { get; set; }
    public decimal Price { get; set; }
    public RecipeStatus Status { get; set; }
}
