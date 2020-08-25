using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;
using TestStream.Models.ApiModels.PlayList;

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

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var playList = db.playLists.Find(id);


                if (playList == null)
                {
                    return this.NotFound(" doesnt exist");
                }
                else
                {

                    return Ok(playList);
                }
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "PlayList", "Get", "Admin");
                return this.NotFound("Dosnt Get Customer successfully");
            }


        }
        // POST api/values/5
        [HttpPut]
        public ActionResult Put([FromBody] PlayListDto playListDto)
        {
            try
            {
                Response objResponse = new Response();

                var customerObj = db.playLists.FirstOrDefault(x => x.Id == playListDto.Id);
                if (customerObj == null)
                {
                    return this.NotFound("Request doesnt exist");
                }
                else
                {
                    customerObj.Name = playListDto.Name;
                    customerObj.StartTime = playListDto.StartTime;
                    customerObj.EndTime = playListDto.EndTime;
                    customerObj.Description = playListDto.Description;
                    customerObj.Image = playListDto.Image;
                    customerObj.PerformerName = playListDto.PerformerName;
                    customerObj.Lamenter = playListDto.Lamenter;
                    customerObj.EventPlace = playListDto.EventPlace;
                    customerObj.IsActive = playListDto.IsActive;
                    customerObj.Duration = DateTime.Now;

                    db.playLists.Update(customerObj);
                    db.SaveChanges();
                }


                objResponse.Data = customerObj;
                objResponse.Status = true;
                objResponse.Message = " Edit Successfully";


                return Ok(objResponse);
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "PlayList", "Put", "Admin");
                return this.NotFound("Dosnt Edit successfully");
            }


        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var playlist = db.playLists.SingleOrDefault(x => x.Id == id);

                if (playlist != null)
                {
                    db.playLists.Remove(playlist);
                    db.SaveChanges();

                    return Ok("Delete successfully");
                }
                else
                {
                    return this.NotFound("Dosnt Delete successfully");
                }
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Playlist", "Delete", "Admin");
                return this.NotFound("Dosnt Delete successfully");
            }
        }
    }
}
