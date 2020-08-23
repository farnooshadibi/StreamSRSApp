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
    public class RequesterController : ControllerBase
    {

        private ApplicationDbContext db;
        public RequesterController(ApplicationDbContext context)
        {
            db = context;
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] Requester requester)
        {
            try
            {
                Response response = new Response();



                db.requesters.Add(requester);
                db.SaveChanges();
                response.Data = requester;
                response.Status = true;
                response.Message = " Create successfully";


                return Ok(response);
            }

            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "Post", "Admin");
                return this.NotFound("Dosnt Create successfully");
            }
        }

    }
}
