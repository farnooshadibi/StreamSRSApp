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
    public class PlayListController : ControllerBase
    {
        private ApplicationDbContext db;
        public PlayListController(ApplicationDbContext context)
        {
            db = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var playList = db.playLists.Where(c => c.IsActive == true).ToList();
                Response response = new Response();
                response.Data = playList;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "PlayList", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] PlayList playList)
        {
            try
            {
                Response response = new Response();
                //playList.StartTime = DateTime.Now;
                //playList.EndTime = DateTime.Now;
                playList.Duration = DateTime.Now;
                playList.IsActive = true;

                db.playLists.Add(playList);
                db.SaveChanges();
                response.Data = playList;
                response.Status = true;
                response.Message = " Create successfully";


                return Ok(response);
            }

            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "PlayList", "Post", "Admin");
                return this.NotFound("Dosnt Create successfully");
            }
        }
    }
}
