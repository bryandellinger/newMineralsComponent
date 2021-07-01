using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Models
{
    public class Pet
    {
        public long Id { get; set; }
        public string PetName { get; set; }
        public DateTime? PetBirthdate { get; set; }
        public double? PetPrice { get; set; }
        public long? PetTypeId { get; set; }
        public PetType PetType  { get; set; }
    }
}
