using inventory_service.DTOs;
using inventory_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace inventory_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockMovementController : ControllerBase
{
    private readonly IStockMovementService _stockMovementService;

    public StockMovementController(IStockMovementService stockMovementService)
    {
        _stockMovementService = stockMovementService;
    }

    [HttpPost]
    public async Task<ActionResult<StockMovementDto>> Create([FromBody] CreateStockMovementRequest request)
    {
        var result = await _stockMovementService.CreateAsync(request);
        return CreatedAtAction(nameof(GetByIngredientId), new { ingredientId = result.IngredientId }, result);
    }

    [HttpGet("ingredient/{ingredientId:guid}")]
    public async Task<ActionResult<List<StockMovementDto>>> GetByIngredientId(Guid ingredientId)
    {
        return Ok(await _stockMovementService.GetByIngredientIdAsync(ingredientId));
    }
}
