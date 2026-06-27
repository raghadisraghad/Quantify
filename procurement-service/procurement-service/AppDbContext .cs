using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace inventory_service
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        //public DbSet<Ingredient> Ingredients => Set<Ingredient>();
    }
}
