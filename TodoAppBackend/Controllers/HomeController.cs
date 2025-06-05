using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TodoAppBackend.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetWelcome()
        {
            return Ok(new
            {
                message = "👋 Bienvenido a la Todo API.",
                version = "v1",
                status = "En ejecución"
            });
        }
    }
}