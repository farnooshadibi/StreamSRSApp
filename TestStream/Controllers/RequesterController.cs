using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;
using TestStream.Models.ApiModels.Requester;

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

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var result = db.requesters.ToList();
                Response response = new Response();
                response.Data = result;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Request", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var request = db.requesters.Find(id);


                if (request == null)
                {
                    return this.NotFound(" doesnt exist");
                }
                else
                {

                    return Ok(request);
                }
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "Get", "Admin");
                return this.NotFound("Dosnt Get Customer successfully");
            }


        }
        // POST api/values/5
        [HttpPut]
        public ActionResult Put([FromBody] RequesterDto requesterDto)
        {
            try
            {
                Response objResponse = new Response();

                var customerObj = db.requesters.FirstOrDefault(x => x.Id == requesterDto.Id);
                if (customerObj == null)
                {
                    return this.NotFound("Request doesnt exist");
                }
                else
                {
                    customerObj.BoardName = requesterDto.BoardName;
                    customerObj.AgentName = requesterDto.AgentName;
                    customerObj.TrusteeName = requesterDto.TrusteeName;
                    customerObj.PhoneNumber = requesterDto.PhoneNumber;
                    customerObj.Email = requesterDto.Email;
                    customerObj.DailySchedule = requesterDto.DailySchedule;
                    customerObj.StartTime = requesterDto.StartTime;
                    customerObj.EndTime = requesterDto.EndTime;
                    customerObj.Description = requesterDto.Description;
                    customerObj.ReviewerOpinion = requesterDto.ReviewerOpinion;
                    customerObj.eventCity = requesterDto.eventCity;
                    customerObj.Processed = requesterDto.Processed;
                    db.requesters.Update(customerObj);
                    db.SaveChanges();
                }


                objResponse.Data = customerObj;
                objResponse.Status = true;
                objResponse.Message = " Edit Successfully";


                return Ok(objResponse);
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Requester", "Put", "Admin");
                return this.NotFound("Dosnt Edit successfully");
            }


        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var request = db.requesters.SingleOrDefault(x => x.Id == id);

                if (request != null)
                {
                    db.requesters.Remove(request);
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
                writeException.Write(e.Message, DateTime.Now, "Requesters", "Delete", "Admin");
                return this.NotFound("Dosnt Delete successfully");
            }
        }

    }
}
