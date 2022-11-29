
using backend.model;
using Microsoft.EntityFrameworkCore;

namespace backend.db.context
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<User> User { get; set; }
        public DbSet<Note> Note { get; set; }

    }
}
