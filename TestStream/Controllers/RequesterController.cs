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
                writeException.Write(e.Message, DateTime.Now, "PlayList", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var customer = db.customers.Find(id);
                CustomerPlayListDto customerPlayListDto = new CustomerPlayListDto();
                customerPlayListDto.Name = customer.Name;
                customerPlayListDto.Url = customer.Url;

                var customerObj = db.customers
                 .Where(customer => customer.Id == id)
                 .Select(customer => new
                 {
                     customer.Name,
                     customer.Description,
                     customer.Url,
                     customer.LatinName,
                     customer.IsActive,
                     customer.Famous,
                     customer.Image,
                     customer.StreamUrl,
                     customer.Token,
                     PlayList = customer.playLists.Where(p => p.EndTime > DateTime.Now)
                                 .OrderBy(p => p.StartTime)
                                 .FirstOrDefault(),
                     startTime = customer.playLists.Where(p => p.EndTime > DateTime.Now)
                                 .OrderBy(p => p.StartTime)
                                 .FirstOrDefault()
                                 .StartTime

                 })
                  .FirstOrDefault();

                if (customerObj == null)
                {
                    return this.NotFound(" doesnt exist");
                }
                else
                {

                    return Ok(customerObj);
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
        public ActionResult Put([FromBody] CustomerDto customerDto)
        {
            try
            {
                Response objResponse = new Response();

                var customerObj = db.customers.FirstOrDefault(x => x.Id == customerDto.Id);
                if (customerObj == null)
                {
                    return this.NotFound("person doesnt exist");
                }
                else
                {
                    customerObj.Name = customerDto.Name;
                    customerObj.Url = customerDto.Url;
                    customerObj.Image = customerDto.Image;
                    customerObj.LatinName = customerDto.LatinName;
                    customerObj.Description = customerDto.Description;
                    customerObj.IsActive = customerDto.IsActive;
                    customerObj.Famous = customerDto.Famous;
                    customerObj.StreamUrl = customerDto.StreamUrl;
                    db.customers.Update(customerObj);
                    //db.Entry(customerObj).State = EntityState.Modified;
                    db.SaveChanges();
                }


                objResponse.Data = customerDto;
                objResponse.Status = true;
                objResponse.Message = " Edit Successfully";


                return Ok(objResponse);
            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customet", "Put", "Admin");
                return this.NotFound("Dosnt Edit successfully");
            }


        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var customer = db.customers.SingleOrDefault(x => x.Id == id);
                var program = db.playLists.Where(c => c.CustomerId == id).FirstOrDefault();


                if (customer != null && program == null)
                {
                    db.customers.Remove(customer);
                    db.SaveChanges();

                    return Ok("Delete successfully");
                }
                else if (customer != null && program != null)
                {
                    return this.NotFound("برای مشتریانی که برنامه ثبت شده، امکان حذف وجود ندارد");
                }
                else
                {
                    return this.NotFound("Dosnt Delete successfully");
                }


            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "Delete", "Admin");
                return this.NotFound("Dosnt Delete successfully");
            }
        }

    }
}
