using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;

namespace TestStream.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShrineController : ControllerBase
    {
        private ApplicationDbContext db;
        public ShrineController(ApplicationDbContext context)
        {
            db = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var shrines = db.shrines.ToList();
                Response response = new Response();
                response.Data = shrines;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Shrine", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var shrine = db.shrines.Find(id);
                if (shrine == null)
                {
                    return this.NotFound("shrine doesnt exist");
                }
                else
                {

                    return Ok(shrine);
                }
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Shrine", "Get", "Admin");
                return this.NotFound("Dosnt Get shrine successfully");
            }


        }
    }
}
