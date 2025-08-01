using System.Diagnostics;
using Armen_FrontEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace Armen_FrontEnd.Controllers
{
    public class ImportController : Controller
    {
        private readonly ILogger<ImportController> _logger;

        public ImportController(ILogger<ImportController> logger)
        {
            _logger = logger;
        }


		public IActionResult Dashboard()
		{
			return View();
		}
		public IActionResult Factories()
		{
			return View();
		}

        public IActionResult FactoryDetails(int id = 1)
        {
            ViewBag.FactoryId = id;
            return View();
        }

		public IActionResult CustomsCodes()
        {
            return View();
        }

        public IActionResult Tasks()
        {
            return View();
        }

        public IActionResult TaskDetails(int id = 5)
        {
            ViewBag.TaskId = id;
            return View();
        }


        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult Costomers()
        {
            return View();
        }

        public IActionResult Suppliers()
        {
            return View();
        }

        public IActionResult SupplierDetails(int id = 1)
        {
            ViewBag.SupplierId = id;
            return View();
        }
    }
}
