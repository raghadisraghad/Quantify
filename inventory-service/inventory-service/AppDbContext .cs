using inventory_service.Models;
using Microsoft.EntityFrameworkCore;

namespace inventory_service;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Ingredient> Ingredients => Set<Ingredient>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Recipe> Recipes => Set<Recipe>();
    public DbSet<RecipeItem> RecipeItems => Set<RecipeItem>();
    public DbSet<StockMovement> StockMovements => Set<StockMovement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeItem>()
            .HasKey(ri => new { ri.RecipeId, ri.IngredientId });

        modelBuilder.Entity<Recipe>()
            .HasMany(r => r.RecipeItems)
            .WithOne(ri => ri.Recipe)
            .HasForeignKey(ri => ri.RecipeId);

        modelBuilder.Entity<Ingredient>()
            .HasMany(i => i.RecipeItems)
            .WithOne(ri => ri.Ingredient)
            .HasForeignKey(ri => ri.IngredientId);

        modelBuilder.Entity<Recipe>()
            .HasOne(r => r.Category)
            .WithMany(c => c.Recipes)
            .HasForeignKey(r => r.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        base.OnModelCreating(modelBuilder);
    }
}
