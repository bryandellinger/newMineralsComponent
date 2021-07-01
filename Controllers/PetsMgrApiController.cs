using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Minerals.Infrastructure;
using Minerals.Interfaces;
using Models;
using System.Linq;
using System.Threading.Tasks;

namespace Minerals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [AuthorizeUser(Roles = "read")]
    public class PetsMgrApiController : ControllerBase
    {
        private readonly IGenericRepository<PetType> genericPetTypeRepository;
        private readonly IPetRepository petRepository;
       
        public PetsMgrApiController(IGenericRepository<PetType> genericPetTypeRepo, IPetRepository petRepo)
        {
            genericPetTypeRepository = genericPetTypeRepo;
            petRepository = petRepo;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await petRepository.GetAllAsync().ConfigureAwait(false));

        [HttpGet("GetPetTypes")]
        public async Task<IActionResult> GetPetTypes() =>
            Ok((await genericPetTypeRepository.GetAllAsync().ConfigureAwait(false)).OrderBy(x => x.PetTypeName));
    }
}
