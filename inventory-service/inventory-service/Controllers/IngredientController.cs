using inventory_service.DTOs;
using inventory_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace inventory_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngredientController : ControllerBase
{
    private readonly IIngredientService _ingredientService;

    public IngredientController(IIngredientService ingredientService)
    {
        _ingredientService = ingredientService;
    }

    [HttpPost]
    public async Task<ActionResult<IngredientDto>> Create([FromBody] CreateIngredientRequest request)
    {
        var result = await _ingredientService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<IngredientDto>> GetById(Guid id)
    {
        var result = await _ingredientService.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("business/{businessId:guid}")]
    public async Task<ActionResult<List<IngredientDto>>> GetByBusinessId(Guid businessId)
    {
        return Ok(await _ingredientService.GetByBusinessIdAsync(businessId));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<IngredientDto>> Update(Guid id, [FromBody] CreateIngredientRequest request)
    {
        var result = await _ingredientService.UpdateAsync(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _ingredientService.DeleteAsync(id);
        return NoContent();
    }
}
