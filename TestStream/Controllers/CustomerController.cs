using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortid;
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

                var customerPlayList = db.customers.ToList();

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
                Response response = new Response();

                var customerPlayList = db.customers
                    .Where(c => c.IsActive == true && c.Famous == true)
                    .Select(c => new
                    {
                        c,
                        PlayList = c.playLists.Where(p => p.EndTime > DateTime.Now.AddHours(2))
                       .OrderBy(p => p.StartTime)
                       .FirstOrDefault()
                    })
                    .ToList();

                var customerList = customerPlayList.Where(c => c.PlayList != null).ToList();

                response.Data = customerList;
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

        [HttpGet("GetOtherCustomer")]
        public ActionResult GetOtherCustomer()
        {
            try
            {
                Response response = new Response();

                var customerPlayList = db.customers
                    .Where(c => c.IsActive == true && c.Famous == false)
                    .Select(customer => new
                    {
                        customer.Id,
                        customer.Name,
                        customer.Description,
                        customer.Url,
                        customer.LatinName,
                        customer.IsActive,
                        customer.Image,
                        customer.StreamUrl,
                        PlayList = customer.playLists.Where(p => p.EndTime > DateTime.Now)
                                .OrderBy(p => p.StartTime)
                                .FirstOrDefault()

                    }) .ToList();

                response.Data = customerPlayList;
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
                customer.StreamKey = customer.KeyStream.ToString().Replace("-", "");
                string id = ShortId.Generate(true, false);
                customer.Token = id;
                string key = customer.KeyStream.ToString().Replace("-", "");

                //customer.Token = GenerateRandomToken.RandomToken();
                //customer.StreamKey = customer.Id;
                customer.Url = string.Format("http://185.194.76.214/live/{0}.m3u8", customer.LatinName);
                customer.StreamUrl = string.Format("http://185.194.76.58/live/{0}?token={1}",customer.LatinName, customer.Token);
                customer.IsActive = true;
                customer.Famous = true;

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
        //renew Token
        [HttpPost("RenewToken")]
        public ActionResult RenewToken([FromBody] Customer customer)
        
        {
            try
            {
                Response objResponse = new Response();

                var customerObj = db.customers.FirstOrDefault(x => x.Id == customer.Id);
                if (customerObj == null)
                {
                    return this.NotFound("person doesnt exist");
                }
                else
                {
                    customerObj.Token = ShortId.Generate(true, false);
                    db.customers.Update(customerObj);
                    db.SaveChanges();
                }


                objResponse.Data = customerObj;
                objResponse.Status = true;
                objResponse.Message = " Edit Successfully";


                return Ok(objResponse);
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
                    PlayList= customer.playLists.Where(p => p.EndTime > DateTime.Now)
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
                else if(customer != null && program != null)
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

        // POST api/values
        [HttpPost("SearchByName")]
        public ActionResult SearchByName([FromBody] CustomerSearchDto customer)
        {
            try
            {
                Response response = new Response();

                string CName = customer.Name.Replace(" ", "");


                if (string.IsNullOrEmpty(CName))
                {
                    return this.NotFound("حداقل یک مورد را برای جستجو وارد نمایید");
                }

                else
                {
                    var result = db.customers.Where(current => current.Name.Replace(" ", "").Contains(CName)).ToList();


                    response.Data = result;
                    response.Status = true;
                    response.Message = " Reseive successfully";


                    return Ok(response);
                }
            }

            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "Post", "Admin");
                return this.NotFound("Dosnt Reseive successfully");
            }
        }

        [HttpGet("GetBlockedIp")]
        public ActionResult GetBlockedIp()
        {
            try
            {
                Response response = new Response();

                var customerBlockList = db.blockedIPs.ToList();

                response.Data = customerBlockList;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Customer", "GetBlockedIp", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        // POST api/values
        [HttpPost("PostBlockedIp")]
        public ActionResult PostBlockedIp([FromBody] BlockedIP blockedIP)
        {
            try
            {
                Response response = new Response();
                blockedIP.StreamKey = blockedIP.url.ToString().Replace("/live/", "");
                blockedIP.Id = 0;
                db.blockedIPs.Add(blockedIP);
                db.SaveChanges();
                response.Data = blockedIP;
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

        [HttpGet("GetCustomersToken")]
        public ActionResult GetCustomersToken()
        {
            try
            {
                Response response = new Response();

                var customers = db.customers
                    .Where(customer => customer.IsActive == true)
                    .Select(customer => new { customer.Token, customer.StreamKey, customer.LatinName })
                    .ToList();


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

    }
}
