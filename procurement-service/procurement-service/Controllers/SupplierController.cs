using procurement_service.DTOs;
using procurement_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace procurement_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupplierController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    [HttpPost]
    public async Task<ActionResult<SupplierDto>> Create([FromBody] CreateSupplierRequest request)
    {
        var result = await _supplierService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<SupplierDto>> GetById(Guid id)
    {
        var result = await _supplierService.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("business/{businessId:guid}")]
    public async Task<ActionResult<List<SupplierDto>>> GetByBusinessId(Guid businessId)
    {
        return Ok(await _supplierService.GetByBusinessIdAsync(businessId));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<SupplierDto>> Update(Guid id, [FromBody] CreateSupplierRequest request)
    {
        var result = await _supplierService.UpdateAsync(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _supplierService.DeleteAsync(id);
        return NoContent();
    }
}
