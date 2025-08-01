using Microsoft.AspNetCore.Mvc;

namespace Armen_FrontEnd.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Map()
        {
            return View();
        }

        public IActionResult HSSearch()
        {
            return View();
        }

        public IActionResult Calculator()
        {
            return View();
        }
		public IActionResult TrackShipment()
		{
			return View();
		}
	}
}