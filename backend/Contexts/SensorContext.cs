using Microsoft.EntityFrameworkCore;
using Models;

namespace Contexts;

public class SensorContext : DbContext 
{
    public DbSet<Sensor> Sensors { get;set; }
    public DbSet<Measurement> Measurements { get;set; }

    public SensorContext(DbContextOptions<SensorContext> options) : base(options)
    { 
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Sensor>()
            .HasMany(x => x.Measurements)
            .WithOne(x => x.Sensor)
            .HasForeignKey("SensorId");

        modelBuilder.Entity<Measurement>()
            .Ignore(x => x.Sensor);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => 
        optionsBuilder.UseNpgsql(
            "Host=172.17.0.2;Database=postgres;Username=postgres;Password=mysecretpassword"
        );
}
