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
            if (!ModelState.IsValid)
            {
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
                //festivalObj.Phone = festival.Phone;
                festivalObj.Description = festival.Description;
                festivalObj.WorkName = festival.WorkName;
                festivalObj.FestivalFileTypeId = festival.fileTypeId;

                db.festivals.Add(festivalObj);
                db.SaveChanges();
                festivalObj.TrackingCode = festivalObj.Id + code;
                db.festivals.Update(festivalObj);
                db.SaveChanges();
                //var filee = Request.Form.Files[0];


                List<string> filesName = new List<string>();
                if (festival.FormFile != null)
                {
                    foreach (IFormFile f in festival.FormFile)
                    {
                        FestivalFile festivalFile = new FestivalFile();
                        string temp = DateTime.Now.Ticks.ToString() + f.FileName;
                        filesName.Add(temp);
                        string filePath = Path.Combine("ClientApp/public/UploadFiles/Festivals", temp);
                        using (Stream stream = new FileStream(filePath, FileMode.Create))
                        {
                            f.CopyTo(stream);
                        }
                        festivalFile.FileURL = filePath.Replace("ClientApp/public", ""); ;
                        festivalFile.FestivalId = festivalObj.Id;
                        db.festivalFiles.Add(festivalFile);
                        db.SaveChanges();
                    }
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
                var result = db.festivals.ToList();
                //            var result = db.festivals
                //.Select(festival => new
                //{
                //    festival.Id,
                //    festival.FirstName,
                //    festival.LastName,
                //    festival.Mobile,
                //    festival.Phone,
                //    festival.Description,
                //    festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id)
                //   .ToList()
                //})
                //.ToList();

                // var festivalList = result.Where(c => c.festivalFile != null).ToList();


                Response response = new Response();
                response.Data = result;
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

        [HttpGet("GetAllFestivalFiles/{page}")]
        public ActionResult GetAllFestivalFiles(int page)
        {
            try
            {
                var count = db.festivals.Where(c => c.Approve == true && c.Processed == true).Count();
                int pageSize = 12;
                if (page == 0) page = 1;
                int skip = (page - 1) * pageSize;
                int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
                var result = db.festivals
                    .Where(c => c.Approve == true && c.Processed == true)
                .Select(festival => new
                {
                    festival.Id,
                    festival.FirstName,
                    festival.LastName,
                    festival.Description,
                    festival.FestivalFileTypeId,
                    festival.Like,
                    comment = festival.comments.Where( c => c.FestivalId == festival.Id && c.Approve == true).Count(),
                    festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id && p.Approve == true)
                   .FirstOrDefault()
                })
                .Skip(skip)
                .Take(pageSize)
                .ToList();

                var list = result.Where(c => c.festivalFile != null).ToList();
                Response response = new Response();
                response.Data = list;
                response.Status = true;
                response.Message = "Received successfully";
                response.CountPage = TotalPages;
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("GetPhotos/{page}")]
        public ActionResult GetPhotos(int page)
        {
            try
            {
                var count = db.festivals.Where(c => c.Approve == true && c.Processed == true && c.FestivalFileTypeId == 1).Count();
                int pageSize = 12;
                if (page == 0) page = 1;
                int skip = (page - 1) * pageSize;
                int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
                var result = db.festivals
                    .Where(c => c.Approve == true && c.Processed == true && c.FestivalFileTypeId == 1)
                .Select(festival => new
                {
                    festival.Id,
                    festival.FirstName,
                    festival.LastName,
                    festival.Description,
                    festival.Like,
                    comment = festival.comments.Where(c => c.FestivalId == festival.Id && c.Approve == true).Count(),
                    festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id && p.Approve == true)
                   .FirstOrDefault()
                })
                .Skip(skip)
                .Take(pageSize)
                .ToList();


                var list = result.Where(c => c.festivalFile != null).ToList();
                Response response = new Response();
                response.Data = list;
                response.Status = true;
                response.Message = "Received successfully";
                response.CountPage = TotalPages;
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("GetVideos/{page}")]
        public ActionResult GetVideos(int page)
        {
            try
            {
                var count = db.festivals.Where(c => c.Approve == true && c.Processed == true && c.FestivalFileTypeId == 2).Count();
                int pageSize = 12;
                if (page == 0) page = 1;
                int skip = (page - 1) * pageSize;
                int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
                var result = db.festivals
                    .Where(c => c.Approve == true && c.Processed == true && c.FestivalFileTypeId == 2)
                .Select(festival => new
                {
                    festival.Id,
                    festival.FirstName,
                    festival.LastName,
                    festival.Description,
                    festival.Like,
                    comment = festival.comments.Where(c => c.FestivalId == festival.Id && c.Approve == true).Count(),
                    festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id && p.Approve == true)
                   .FirstOrDefault()
                })
                .Skip(skip)
                .Take(pageSize)
                .ToList();

                var list = result.Where(c => c.festivalFile != null).ToList();
                Response response = new Response();
                response.Data = list;
                response.Status = true;
                response.Message = "Received successfully";
                response.CountPage = TotalPages;
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("GetAudios/{page}")]
        public ActionResult GetAudios(int page)
        
        {
            try
            {
                var count = db.festivals.Where(c => c.Approve == true && c.Processed == true && c.FestivalFileTypeId == 3).Count();
                int pageSize = 12;
                if (page == 0) page = 1;
                int skip = (page - 1) * pageSize;
                int TotalPages = (int)Math.Ceiling(count / (double)pageSize);
                var result = db.festivals
                    .Where(c => c.Approve == true && c.Processed == true && c.FestivalFileTypeId == 3)
                .Select(festival => new
                {
                    festival.Id,
                    festival.FirstName,
                    festival.LastName,
                    festival.Description,
                    festival.Like,
                    comment = festival.comments.Where(c => c.FestivalId == festival.Id && c.Approve == true).Count(),
                    festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id && p.Approve == true)
                   .FirstOrDefault()
                })
                .Skip(skip)
                .Take(pageSize)
                .ToList();

                var list = result.Where(c => c.festivalFile != null).ToList();
                Response response = new Response();
                response.Data = list;
                response.Status = true;
                response.Message = "Received successfully";
                response.CountPage = TotalPages;
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Get", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("GetFileDetails/{id}")]
        public ActionResult GetFileDetails(int id)
        {
            try
            {
                var result = db.festivals
                    .Where(c => c.Approve == true && c.Processed == true && c.Id == id)
                .Select(festival => new
                {
                    festival.Id,
                    festival.FirstName,
                    festival.LastName,
                    festival.Description,
                    festival.FestivalFileTypeId,
                    festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id && p.Approve == true)
                   .ToList()
                })
                .FirstOrDefault();


                Response response = new Response();
                response.Data = result;
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
                var result = db.festivals
                 .Where(c => c.Id == id)
                 .Select(festival => new
                 {
                     festival.Id,
                     festival.FirstName,
                     festival.LastName,
                     festival.Description,
                     festival.Mobile,
                    // festival.Phone,
                     festival.Approve,
                     festival.Processed,
                     festival.TrackingCode,
                     festival.WorkName,
                     festival.FestivalFileTypeId,
                     festival.Like,
                     comment = festival.comments.Where(c => c.FestivalId == festival.Id && c.Approve == true).Count(),
                     festivalFile = festival.festivalFiles.Where(p => p.FestivalId == festival.Id)
                    .ToList()
                 })
                 .FirstOrDefault();
                //var files = db.festivalFiles.Where(current => current.FestivalId == id).ToList();

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

        [HttpGet("GetFestivalType")]
        public ActionResult GetFestivalType()
        {
            try
            {
                Response response = new Response();

                var typeList = db.festivalFileType.ToList();

                response.Data = typeList;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "GetFestivalType", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpGet("GetLikeCount/{id}")]
        public ActionResult GetLikeCount(int id)
        {
            try
            {
                Response response = new Response();

                var like = db.festivals.Where(c => c.Id == id).SingleOrDefault().Like;

                response.Data = like;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "GetLikeCount", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpPost("PostLike")]
        public ActionResult PostLike([FromBody] FestivalDto festival)
        {

            try
            {
                var festivalObj = db.festivals.Where(c => c.Id == festival.Id).SingleOrDefault();
                Response response = new Response();

                if (festivalObj != null)
                {
                    if (festival.Like == true)
                    {
                        festivalObj.Like += 1;
                    }

                    if (festival.Like == false)
                    {
                        festivalObj.Like -= 1;
                    }


                    db.festivals.Update(festivalObj);
                    db.SaveChanges();

                    response.Data = festivalObj;
                    response.Status = true;
                    response.Message = "Create successfully";

                }




                return Ok(response);
            }

            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "Post", "Admin");
                return this.NotFound("Dosnt Create successfully");
            }
        }

        [HttpGet("GetComments/{id}")]
        public ActionResult GetComments(int id)
        {
            try
            {
                Response response = new Response();

                var comments = db.comments.Where(c => c.FestivalId == id && c.Approve == true).ToList();

                response.Data = comments;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "GetComments", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }


        [HttpGet("GetCommentsList")]
        public ActionResult GetCommentsList()
        {
            try
            {
                Response response = new Response();

                var comments = db.comments.ToList();

                response.Data = comments;
                response.Status = true;
                response.Message = "Received successfully";
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "GetCommentsList", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }

        [HttpPost("PostComment")]
        public ActionResult PostComment([FromBody] Comment comment)
        {
            try
            {

                Response response = new Response();
                if(string.IsNullOrEmpty(comment.Text)) {
                    return this.NotFound("متن پیام نمی تواند خالی باشد");

                }
                else
                {
                    if (string.IsNullOrEmpty(comment.Name))
                    {
                        comment.Name = "بی نام";

                    }
                    comment.SubmitDate = DateTime.Now;
                    db.comments.Add(comment);
                    db.SaveChanges();

                    response.Data = comment;
                    response.Status = true;
                    response.Message = "Create successfully";

                }
                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "PostComment", "Admin");
                return this.NotFound("Dosnt Received successfully");
            }

        }
        [HttpPost("ApproveComment")]
        public ActionResult ApproveComment([FromBody] Comment comment)
        {
            try
            {

                Response response = new Response();
                var cmmt = db.comments.Find(comment.Id);
                //var cmmt = db.comments.FirstOrDefault(x => x.FestivalId == comment.FestivalId);
                cmmt.Approve = comment.Approve;

                db.comments.Update(cmmt);
                db.SaveChanges();

                response.Data = comment;
                response.Status = true;
                response.Message = "Create successfully";


                return Ok(response);

            }
            catch (Exception e)
            {
                writeException.Write(e.Message, DateTime.Now, "Festival", "PostComment", "Admin");
                return this.NotFound("Dosnt Received successfully");
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
                    //festivalDto.festivalFile.Approve = 1;
                    //festivalDto.festivalFile.Id
                    festivalObj.Processed = festivalDto.Processed;
                    festivalObj.Approve = festivalDto.Approve;
                    festivalObj.Result = festivalDto.Result;

                    db.festivals.Update(festivalObj);
                    db.SaveChanges();

                    var result = festivalDto.festivalFile.ToList();
                    if( result != null)
                    {
                        foreach (var item in result)
                        {
                            var fileObj = db.festivalFiles.FirstOrDefault(x => x.Id == item.Id);
                            fileObj.Approve = item.Approve;

                            db.festivalFiles.Update(fileObj);
                            db.SaveChanges();

                        }
                    }


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
