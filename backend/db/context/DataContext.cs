
using backend.model;
using Microsoft.EntityFrameworkCore;

namespace backend.db.context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        
        }

        public DbSet<User> Users{ get; set; }
        public DbSet<NotesDTO> Notes { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Token> Tokens { get; set; }

    }
}
