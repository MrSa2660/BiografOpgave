using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiografOpgave.Domain
{
  public class Person
  {
    public string Name { get; set; }
    public string Lastname { get; set; }
    public string Mail { get; set; }
    public int Id { get; set; } // kan staves på alle måder + className
    public int PersonId { get; set; }
  }
}
