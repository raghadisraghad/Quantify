using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace procurement_service.Models;

[Table("suppliers")]
public class Supplier
{
    [Key]
    [Column("id", TypeName = "uuid")]
    public Guid Id { get; set; }

    [Required]
    [Column("business_id", TypeName = "uuid")]
    public Guid BusinessId { get; set; }

    [Required]
    [Column("name")]
    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [Column("contact_name")]
    [StringLength(255)]
    public string ContactName { get; set; } = string.Empty;

    [Column("email")]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Column("phone")]
    [StringLength(100)]
    public string Phone { get; set; } = string.Empty;

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<PurchaseOrder> PurchaseOrders { get; set; } = new List<PurchaseOrder>();
}
