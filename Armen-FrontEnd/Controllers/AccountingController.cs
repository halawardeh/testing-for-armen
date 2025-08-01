using Microsoft.AspNetCore.Mvc;

namespace Armen_FrontEnd.Controllers
{
    public class AccountingController : Controller
    {
     
        public IActionResult Dashboard()
        {
            return View();
        }

        public IActionResult TasksDetalse()
        {
            return View();
        }

      

   
        public IActionResult Profile()
        {
            return View();
        }
    }
}