using Microsoft.EntityFrameworkCore;
using Minerals.Contexts;
using Minerals.Interfaces;
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
    }
}
