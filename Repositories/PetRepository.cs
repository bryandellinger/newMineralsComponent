using Microsoft.EntityFrameworkCore;
using Minerals.Contexts;
using Minerals.Interfaces;
using Models;
using System.Linq;
using System.Threading.Tasks;

namespace Minerals.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly DataContext context;
        public PetRepository(DataContext ctx) => context = ctx;

        public async Task<object> GetAllAsync() =>
await context.Pets.Select(x => new
{
   x.Id,
   x.PetBirthdate,
   x.PetName,
   x.PetPrice,
  x.PetType.PetTypeName
})
 .OrderBy(x => x.PetName)
.ToListAsync()
.ConfigureAwait(false);

        public void Update(Pet model)
        {
            var pet = context.Pets.Find(model.Id);
            pet.PetName = model.PetName;
            pet.PetTypeId = model.PetTypeId;
            pet.PetPrice = model.PetPrice;
            pet.PetBirthdate = model.PetBirthdate;

            context.SaveChanges();
        }
    }
}
