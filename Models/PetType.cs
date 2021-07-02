using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public class PetType
    {
        public long Id { get; set; }
        public string PetTypeName { get; set; }
        public IEnumerable<Pet> Pets { get; set; }
    }
}
