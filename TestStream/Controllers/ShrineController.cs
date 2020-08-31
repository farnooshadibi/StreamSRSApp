using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;
using TestStream.Models.ApiModels.PlayList;
using TestStream.Models.ApiModels.Shrine;

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
                var shrines = db.shrines.Where(c => c.IsActive == true).ToList();
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
        [HttpGet("GetShrines")]
        public ActionResult GetShrines()
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

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] Shrine shrine)
        {
            try
            {
                Response response = new Response();

                shrine.IsActive = true;
                if (!string.IsNullOrEmpty(shrine.Image))
                {
                    var dataparts = shrine.Image.Split(',');
                    if (dataparts.Length > 1)
                    {
                        shrine.Image = dataparts[1];
                    }

                    var convertImage = Convert.FromBase64String(shrine.Image);
                    string imageName = shrine.Id + "-" + Guid.NewGuid().ToString();
                    var filePath = Path.Combine("ClientApp/public/Images/Shrines", imageName + ".png");
                    System.IO.File.WriteAllBytes(filePath, convertImage);

                    shrine.Image = filePath.Replace("ClientApp/public", "");

                }
                db.shrines.Add(shrine);
                db.SaveChanges();
                response.Data = shrine;
                response.Status = true;
                response.Message = " Create successfully";
                return Ok(response);
            }

            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Shrine", "Post", "Admin");
                return this.NotFound("Dosnt Create successfully");
            }
        }

        [HttpPut]
        public ActionResult Put([FromBody] ShrineDto shrineDto)
        {
            try
            {
                Response objResponse = new Response();

                var customerObj = db.shrines.FirstOrDefault(x => x.Id == shrineDto.Id);
                if (customerObj == null)
                {
                    return this.NotFound("Request doesnt exist");
                }
                else
                {
                    if (!string.IsNullOrEmpty(shrineDto.Image) && shrineDto.Image.Contains("data:image"))
                    {
                        var dataparts = shrineDto.Image.Split(',');
                        if (dataparts.Length > 1)
                        {
                            shrineDto.Image = dataparts[1];
                        }

                        var convertImage = Convert.FromBase64String(shrineDto.Image);
                        string imageName = shrineDto.Id + "-" + Guid.NewGuid().ToString();
                        var filePath = Path.Combine("ClientApp/public/Images/Shrines", imageName + ".png");
                        System.IO.File.WriteAllBytes(filePath, convertImage);

                        shrineDto.Image = filePath.Replace("ClientApp/public", "");

                    }
                    customerObj.Name = shrineDto.Name;
                    customerObj.Url = shrineDto.Url;
                    customerObj.Image = shrineDto.Image;
                    customerObj.Description = shrineDto.Description;
                    customerObj.IsActive = shrineDto.IsActive;

                    db.shrines.Update(customerObj);
                    db.SaveChanges();
                }


                objResponse.Data = customerObj;
                objResponse.Status = true;
                objResponse.Message = " Edit Successfully";


                return Ok(objResponse);
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Shrine", "Put", "Admin");
                return this.NotFound("Dosnt Edit successfully");
            }


        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var shrine = db.shrines.SingleOrDefault(x => x.Id == id);

                if (shrine != null)
                {
                    db.shrines.Remove(shrine);
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
                writeException.Write(e.Message, DateTime.Now, "Shrine", "Delete", "Admin");
                return this.NotFound("Dosnt Delete successfully");
            }
        }
    }
}
