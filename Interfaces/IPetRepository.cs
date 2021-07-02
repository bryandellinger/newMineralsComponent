using Models;
using System.Threading.Tasks;

namespace Minerals.Interfaces
{
  public  interface IPetRepository
    {
        Task<object> GetAllAsync();
        void Update(Pet model);
    }
}
