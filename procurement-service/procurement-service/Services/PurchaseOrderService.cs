using procurement_service.DTOs;
using procurement_service.Models;
using procurement_service.Repositories;

namespace procurement_service.Services;

public class PurchaseOrderService : IPurchaseOrderService
{
    private readonly IPurchaseOrderRepository _repository;

    public PurchaseOrderService(IPurchaseOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task<PurchaseOrderDto> CreateAsync(CreatePurchaseOrderRequest request)
    {
        var purchaseOrder = new PurchaseOrder
        {
            Id = Guid.NewGuid(),
            BusinessId = request.BusinessId,
            SupplierId = request.SupplierId,
            Status = Enum.Parse<POStatus>(request.Status, true),
            TotalCostMAD = request.TotalCostMAD,
            OrderedAt = request.OrderedAt,
            ReceivedAt = request.ReceivedAt,
            Notes = request.Notes,
            Items = request.Items.Select(i => new PurchaseOrderItem
            {
                Id = Guid.NewGuid(),
                IngredientId = i.IngredientId,
                QuantityOrdered = i.QuantityOrdered,
                UnitPriceCost = i.UnitPriceCost
            }).ToList()
        };

        var created = await _repository.AddAsync(purchaseOrder);
        return MapToDto(created);
    }

    public async Task<PurchaseOrderDto?> GetByIdAsync(Guid id)
    {
        var purchaseOrder = await _repository.GetByIdAsync(id);
        return purchaseOrder is null ? null : MapToDto(purchaseOrder);
    }

    public async Task<List<PurchaseOrderDto>> GetByBusinessIdAsync(Guid businessId)
    {
        var purchaseOrders = await _repository.GetByBusinessIdAsync(businessId);
        return purchaseOrders.Select(MapToDto).ToList();
    }

    public async Task<PurchaseOrderDto?> UpdateAsync(Guid id, CreatePurchaseOrderRequest request)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return null;

        existing.BusinessId = request.BusinessId;
        existing.SupplierId = request.SupplierId;
        existing.Status = Enum.Parse<POStatus>(request.Status, true);
        existing.TotalCostMAD = request.TotalCostMAD;
        existing.OrderedAt = request.OrderedAt;
        existing.ReceivedAt = request.ReceivedAt;
        existing.Notes = request.Notes;

        existing.Items.Clear();
        foreach (var itemRequest in request.Items)
        {
            existing.Items.Add(new PurchaseOrderItem
            {
                Id = Guid.NewGuid(),
                PurchaseOrderId = existing.Id,
                IngredientId = itemRequest.IngredientId,
                QuantityOrdered = itemRequest.QuantityOrdered,
                UnitPriceCost = itemRequest.UnitPriceCost
            });
        }

        var updated = await _repository.UpdateAsync(existing);
        return MapToDto(updated);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }

    private static PurchaseOrderDto MapToDto(PurchaseOrder purchaseOrder) => new()
    {
        Id = purchaseOrder.Id,
        BusinessId = purchaseOrder.BusinessId,
        SupplierId = purchaseOrder.SupplierId,
        Status = purchaseOrder.Status.ToString(),
        TotalCostMAD = purchaseOrder.TotalCostMAD,
        OrderedAt = purchaseOrder.OrderedAt,
        ReceivedAt = purchaseOrder.ReceivedAt,
        Notes = purchaseOrder.Notes,
        Items = purchaseOrder.Items.Select(item => new PurchaseOrderItemDto
        {
            Id = item.Id,
            PurchaseOrderId = item.PurchaseOrderId,
            IngredientId = item.IngredientId,
            QuantityOrdered = item.QuantityOrdered,
            UnitPriceCost = item.UnitPriceCost
        }).ToList()
    };
}
