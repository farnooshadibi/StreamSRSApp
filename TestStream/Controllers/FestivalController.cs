using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using shortid;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;
using TestStream.Models.ApiModels.Festival;

namespace TestStream.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FestivalController : ControllerBase
    {
        private ApplicationDbContext db;
        public FestivalController(ApplicationDbContext context)
        {
            db = context;
        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromForm] FestivalDto festival)
        {
            if (!ModelState.IsValid) {
                return Ok(ModelState.ErrorCount);
            }

            try
            {
                Response response = new Response();
                Festival festivalObj = new Festival();
                string code = ShortId.Generate(true, false);
                festivalObj.SubmitDate = DateTime.Now;
                festivalObj.FirstName = festival.FirstName;
                festivalObj.LastName = festival.LastName;
                festivalObj.Mobile = festival.Mobile;
                festivalObj.Phone = festival.Phone;
                festivalObj.Description = festival.Description;
               
                db.festivals.Add(festivalObj);
                db.SaveChanges();
                festivalObj.TrackingCode = festivalObj.Id + code;
                db.festivals.Update(festivalObj);
                db.SaveChanges();
                //var filee = Request.Form.Files[0];


                List<string> filesName = new List<string>(); 
                foreach (IFormFile f in festival.FormFile)
                {
                    FestivalFile festivalFile = new FestivalFile();
                    string temp = DateTime.Now.Ticks.ToString() + f.FileName;
                    filesName.Add(temp);
                    string filePath = Path.Combine("UploadFiles/Festivals", temp);
                    using (Stream stream = new FileStream(filePath, FileMode.Create))
                    {
                        f.CopyTo(stream);
                    }
                    festivalFile.FileURL = filePath;
                    festivalFile.FestivalId = festivalObj.Id;
                    db.festivalFiles.Add(festivalFile);
                    db.SaveChanges();
                }         



                response.Data = festivalObj;
                response.Status = true;
                response.Message = "Create successfully";


                return Ok(response);
            }

            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Post", "Admin");
                return this.NotFound("Dosnt Create successfully");
            }
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var result = db.festivals
    .Select(festival => new
    {
        festival.Id,
        festival.FirstName,
        festival.LastName,
        festival.Mobile,
        festival.Phone,
        festival.Description,
        festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id)
       .ToList()
    })
    .ToList();

                var festivalList = result.Where(c => c.festivalFile != null).ToList();


                Response response = new Response();
                response.Data = festivalList;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var result = db.festivals.Find(id);


                if (result == null)
                {
                    return this.NotFound(" doesnt exist");
                }
                else
                {

                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Get", "Admin");
                return this.NotFound("Dosnt Get Festival successfully");
            }


        }
        // POST api/values/5
        [HttpPut]
        public ActionResult Put([FromBody] FestivalDto festivalDto)
        {
            try
            {
                Response objResponse = new Response();

                var festivalObj = db.festivals.FirstOrDefault(x => x.Id == festivalDto.Id);
                if (festivalObj == null)
                {
                    return this.NotFound("Request doesnt exist");
                }
                else
                {
                    //festivalObj.FirstName = requesterDto.BoardName;
                    //festivalObj.LastName = requesterDto.AgentName;
                    //festivalObj.Mobile = requesterDto.TrusteeName;
                    //festivalObj.Phone = requesterDto.PhoneNumber;
                    //festivalObj.Description = requesterDto.Email;
                    festivalObj.Processed = festivalDto.Processed;
                    festivalObj.Result = festivalDto.Result;

                    db.festivals.Update(festivalObj);
                    db.SaveChanges();
                }


                objResponse.Data = festivalObj;
                objResponse.Status = true;
                objResponse.Message = " Edit Successfully";


                return Ok(objResponse);
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Put", "Admin");
                return this.NotFound("Dosnt Edit successfully");
            }


        }

    }
}
