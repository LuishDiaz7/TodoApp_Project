using Microsoft.EntityFrameworkCore;
using TodoAppBackend.Models;

namespace TodoAppBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the relationship between User and Task
            modelBuilder.Entity<Assignment>()
                .HasOne(t => t.User)
                .WithMany(u => u.Assignments)
                .HasForeignKey(t => t.UserId);
        }
    }
}