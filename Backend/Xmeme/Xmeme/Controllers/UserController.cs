using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Xmeme.Controllers
{
    [Route("api/[controller]")]

    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
