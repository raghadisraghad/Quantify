using inventory_service.DTOs;
using inventory_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace inventory_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeController : ControllerBase
{
    private readonly IRecipeService _recipeService;

    public RecipeController(IRecipeService recipeService)
    {
        _recipeService = recipeService;
    }

    [HttpPost]
    public async Task<ActionResult<RecipeDto>> Create([FromBody] CreateRecipeRequest request)
    {
        var result = await _recipeService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RecipeDto>> GetById(Guid id)
    {
        var result = await _recipeService.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("business/{businessId:guid}")]
    public async Task<ActionResult<List<RecipeDto>>> GetByBusinessId(Guid businessId)
    {
        return Ok(await _recipeService.GetByBusinessIdAsync(businessId));
    }

    [HttpGet("category/{categoryId:guid}")]
    public async Task<ActionResult<List<RecipeDto>>> GetByCategoryId(Guid categoryId)
    {
        return Ok(await _recipeService.GetByCategoryIdAsync(categoryId));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RecipeDto>> Update(Guid id, [FromBody] CreateRecipeRequest request)
    {
        var result = await _recipeService.UpdateAsync(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _recipeService.DeleteAsync(id);
        return NoContent();
    }

    [HttpPost("{recipeId:guid}/ingredients/{ingredientId:guid}")]
    public async Task<ActionResult<RecipeItemDto>> AddRecipeItem(Guid recipeId, Guid ingredientId, [FromQuery] decimal quantity)
    {
        var result = await _recipeService.AddRecipeItemAsync(recipeId, ingredientId, quantity);
        return CreatedAtAction(nameof(GetRecipeItemsByRecipeId), new { recipeId }, result);
    }

    [HttpGet("{recipeId:guid}/ingredients")]
    public async Task<ActionResult<List<RecipeItemDto>>> GetRecipeItemsByRecipeId(Guid recipeId)
    {
        return Ok(await _recipeService.GetRecipeItemsByRecipeIdAsync(recipeId));
    }

    [HttpDelete("{recipeId:guid}/ingredients/{ingredientId:guid}")]
    public async Task<IActionResult> DeleteRecipeItem(Guid recipeId, Guid ingredientId)
    {
        await _recipeService.DeleteRecipeItemAsync(recipeId, ingredientId);
        return NoContent();
    }
}
