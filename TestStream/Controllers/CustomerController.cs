using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;
using TestStream.Models.ApiModels.Customer;

namespace TestStream.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ApplicationDbContext db;
        public CustomerController(ApplicationDbContext context)
        {
            db = context;
        }

        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                Response response = new Response();
                List<CustomerProgramDto> list = new List<CustomerProgramDto>();
                CustomerProgramDto customerDto = new CustomerProgramDto();

                var customerPlayList = db.customers
                    .Where(c => c.IsActive == true)
                    .Include(c => c.playLists)
                    .ToList();



                //var customers = db.customers.Where(c => c.IsActive == true).ToList();
                //foreach (var c in customers)
                //{
                //    var program = db.playLists.Where(item => item.CustomerId == c.Id).FirstOrDefault();

                //    list.Add(new CustomerProgramDto
                //    {
                //        Image = c.Image,
                //        Url = c.Url,
                //        Name = c.Name,
                //        Id = c.Id,
                //        PlayList = program
                //    });

                //}
                response.Data = customerPlayList;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            //try
            //{

            //    Response response = new Response();

            //    var customers = db.customers.Where(c => c.IsActive == true).ToList();
            //    List<CustomerProgramDto> list = new List<CustomerProgramDto>();
            //    CustomerProgramDto customerDto = new CustomerProgramDto();
            //    customerDto.playList = new PlayList();
            //    foreach ( var c in customers)
            //    {
            //        var program = db.playLists.Where(c => c.CustomerId == c.Id).FirstOrDefault();
            //        customerDto.Image = c.Image;
            //        customerDto.Url = c.Url;
            //        customerDto.Name = c.Name;
            //        customerDto.Id = c.Id;
            //        customerDto.playList = program;
            //        list.Add(new CustomerProgramDto
            //        {
            //            Image = c.Image,
            //            Url = c.Url,
            //            Name = c.Name,
            //            Id = c.Id,
            //            playList = new PlayList { Id = program.Id, Name= program.Name,
            //            PerformerName = program.PerformerName,
            //            Lamenter = program.Lamenter,
            //            StartTime = program.StartTime,
            //            EndTime = program.EndTime
            //            }
            //        });

            //    }
            //    response.Data = list;
            //    response.Status = true;
            //    response.Message = "Received successfully";
            //    return Ok(response);

            //}
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("GetFamousCustomer")]
        public ActionResult GetFamousCustomer()
        {
            try
            {
                var customers = db.customers.Where(c => c.IsActive == true && c.Famous == true).ToList();
                Response response = new Response();
                response.Data = customers;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "GetFamousCustomer", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        // POST api/values
        [HttpPost]
        public ActionResult Post([FromBody] Customer customer)
        {
            try
            {
                Response response = new Response();

                customer.KeyStream = Guid.NewGuid();
                //customer.StreamKey = customer.Id;
                customer.Url = string.Format("http://185.194.76.218:8080/live/{0}.m3u8", customer.KeyStream);
                customer.IsActive = true;

                //if (customer.Image != null)
                //{
                //    if (customer.Image.Length > 0)//Convert Image to byte and save to database
                //    {
                //        byte[] p1 = null;
                //        using (var fs1 = Image.OpenReadStream())
                //        using (var ms1 = new MemoryStream())
                //        {
                //            fs1.CopyTo(ms1);
                //            p1 = ms1.ToArray();
                //        }
                //        customer.Image = p1;
                //    }
                //}


                db.customers.Add(customer);
                db.SaveChanges();
                response.Data = customer;
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

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var customer = db.customers.Find(id);
                if (customer == null)
                {
                    return this.NotFound("person doesnt exist");
                }
                else
                {

                    return Ok(customer);
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


                if (customer != null)
                {
                    db.customers.Remove(customer);
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
                writeException.Write(e.Message, DateTime.Now, "Customer", "Delete", "Admin");
                return this.NotFound("Dosnt Delete successfully");
            }
        }


    }
}
