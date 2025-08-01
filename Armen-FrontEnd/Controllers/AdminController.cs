using Microsoft.AspNetCore.Mvc;

namespace Armen_FrontEnd.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult ControlPanel()
        {
            return View();
        }

        public IActionResult profile()
        {
            return View();
        }

        public IActionResult BlogAdmin()
        {
            return View();
        }

        public IActionResult CurrencyRates()
        {
            return View();
        }
        public IActionResult CustomerManagement()
        {
            return View();
        }

        public IActionResult ExternalOrders()
        {
            return View();
        }

        public IActionResult OrderDistribution()
        {
            return View();
        }
        public IActionResult Partners()
        {
            return View();
        }
        public IActionResult ShippingOrders()
        {
            return View();
        }

        public IActionResult UserManagement()
        {
            return View();
        }
        public IActionResult services()
        {
            return View();
        }

        public IActionResult BookingRequests()
        {
            return View();
        }
        public IActionResult Factory()
        {
            return View();
        }
     
        public IActionResult FactoryDetails(int id = 1)
        {
            ViewBag.FactoryId = id;
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
