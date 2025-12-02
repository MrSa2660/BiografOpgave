using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BiografOpgave.Domain;

namespace BiografOpgave.Infrastructure
{
  public class DatabaseContext : DbContext
  {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        // højre are out tables presented as DBSet <T>

        public DbSet<BiografOpgave.Domain.Person> Persons { get; set; }


  }
}
