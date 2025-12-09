using BiografOpgave.Domain.Models;

namespace BiografOpgave.Infrastructure
{
  public class DatabaseContext : DbContext
  {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        // højre are out tables presented as DBSet <T>

        public DbSet<Person> Persons { get; set; }
  }
}