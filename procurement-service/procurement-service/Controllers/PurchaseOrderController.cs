using procurement_service.DTOs;
using procurement_service.Services;
using Microsoft.AspNetCore.Mvc;

namespace procurement_service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchaseOrderController : ControllerBase
{
    private readonly IPurchaseOrderService _purchaseOrderService;

    public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
    {
        _purchaseOrderService = purchaseOrderService;
    }

    [HttpPost]
    public async Task<ActionResult<PurchaseOrderDto>> Create([FromBody] CreatePurchaseOrderRequest request)
    {
        var result = await _purchaseOrderService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<PurchaseOrderDto>> GetById(Guid id)
    {
        var result = await _purchaseOrderService.GetByIdAsync(id);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpGet("business/{businessId:guid}")]
    public async Task<ActionResult<List<PurchaseOrderDto>>> GetByBusinessId(Guid businessId)
    {
        return Ok(await _purchaseOrderService.GetByBusinessIdAsync(businessId));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<PurchaseOrderDto>> Update(Guid id, [FromBody] CreatePurchaseOrderRequest request)
    {
        var result = await _purchaseOrderService.UpdateAsync(id, request);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _purchaseOrderService.DeleteAsync(id);
        return NoContent();
    }
}
