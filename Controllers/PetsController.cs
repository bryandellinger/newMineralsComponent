using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Minerals.ViewModels;

namespace Minerals.Controllers
{
    public class PetsController : Controller
    {
        private MenuDataViewModel data;
        public PetsController(MenuDataViewModel d) => data = d;
        public IActionResult Index() => View(data.menu.Modules.First(x => x.ModuleName == "Pets").Pages);
    }
}
