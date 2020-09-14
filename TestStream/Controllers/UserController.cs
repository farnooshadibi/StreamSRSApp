using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TestStream.Data;
using TestStream.Extra_Classes;
using TestStream.Models;

namespace TestStream.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private ApplicationDbContext db;
        public UserController(ApplicationDbContext context)
        {
            db = context;
        }

        //[Authorize]
        // GET api/values/5
        //[HttpGet("{id}")]
        //public ActionResult Get(int id)
        //{
        //    try
        //    {
        //        var user = db.user.Find(id);
        //        CustomerPlayListDto customerPlayListDto = new CustomerPlayListDto();
        //        customerPlayListDto.Name = customer.Name;
        //        customerPlayListDto.Url = customer.Url;

        //        var customerObj = db.customers
        //         .Where(customer => customer.Id == id)
        //         .Select(customer => new
        //         {
        //             customer.Name,
        //             customer.Description,
        //             customer.Url,
        //             customer.LatinName,
        //             customer.IsActive,
        //             customer.Famous,
        //             customer.Image,
        //             customer.StreamUrl,
        //             customer.Token,
        //             PlayList = customer.playLists.Where(p => p.EndTime > DateTime.Now)
        //                         .OrderBy(p => p.StartTime)
        //                         .FirstOrDefault(),
        //             startTime = customer.playLists.Where(p => p.EndTime > DateTime.Now)
        //                         .OrderBy(p => p.StartTime)
        //                         .FirstOrDefault()
        //                         .StartTime,
        //             IntervalSec = ((customer.playLists.Where(p => p.EndTime > DateTime.Now)
        //                         .OrderBy(p => p.StartTime)
        //                         .FirstOrDefault()
        //                         .StartTime - DateTime.Now).TotalSeconds)
        //         })
        //          .FirstOrDefault();

        //        if (customerObj == null)
        //        {
        //            return this.NotFound(" doesnt exist");
        //        }
        //        else
        //        {

        //            return Ok(customerObj);
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        writeException.Write(e.Message, DateTime.Now, "Customer", "Get", "Admin");
        //        return this.NotFound("Dosnt Get Customer successfully");
        //    }


        //}

        [HttpPost("Login")]
        public ActionResult Login([FromBody] User user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                {
                    return this.NotFound("نام کاربری یا رمز عبور اشتباه است");
                }
                //
                var passwordHasher = new PasswordHasher<User>();
                //User user1 = new User();
                //var hashedPassword = passwordHasher.HashPassword(user,user.Password);

                var user2 = db.users.Where(current => current.UserName == user.UserName).FirstOrDefault();

                var check = passwordHasher.VerifyHashedPassword(user2, user2.Password, user.Password);

                if (user2 != null &&  check == PasswordVerificationResult.Success)
                    {
                    Response response = new Response();

                    response.Data = user2;
                    response.Status = true;
                    response.Message = "Received successfully";
                    return Ok(response);
                    
                    //var doctorID = doctor.drId;

                    //    output.Login.id = doctor.ID;
                    //    output.Login.label = "drToken";
                    //    output.Login.value = doctorID.ToString();
                    //    return Ok(output);
                    }
                    else
                    {
                        return this.NotFound("نام کاربری یا رمز عبور اشتباه است");
                    }

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "User", "Post", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpPost]
        public ActionResult Post([FromBody] User user)
        {
            try
            {
                var passwordHasher = new PasswordHasher<User>();
                if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password))
                {
                    return this.NotFound("نام کاربری و رمزعبور را وارد نمایید");
                }
                var user2 = db.users.Where(current => current.UserName == user.UserName).FirstOrDefault();
                if (user2 != null)
                {
                    return this.NotFound("  نام کاربری قبلا در سامانه ثبت شده است ");
                   // var check = passwordHasher.VerifyHashedPassword(user2, user2.Password, user.Password);
                }
                else
                {
                    
                //var user = new AppUser();
                
                Response response = new Response();
                var hashedPassword = passwordHasher.HashPassword(user, user.Password);
                user.Password = hashedPassword;
                user.Token = Guid.NewGuid();
                db.users.Add(user);
                db.SaveChanges();

                response.Data = user;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);
                }

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "User", "Get", "User");
                return this.NotFound("Dosnt Received successfully");
            }

        }

    }
}
