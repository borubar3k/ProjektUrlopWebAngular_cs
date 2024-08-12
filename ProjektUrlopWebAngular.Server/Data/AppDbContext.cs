using Microsoft.EntityFrameworkCore;
using ProjektUrlopWebAngular.Server.Models.Entities;

namespace ProjektUrlopWebAngular.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Pracownik> Pracownicy { get; set; } = null!;
        public DbSet<Urlop> Urlopy { get; set; } = null!;
        public DbSet<Log> Logi { get; set; } = null!;
    }
}
