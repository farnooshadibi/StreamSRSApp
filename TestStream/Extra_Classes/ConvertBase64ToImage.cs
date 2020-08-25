//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Threading.Tasks;
//using static System.Net.Mime.MediaTypeNames;

//namespace TestStream.Extra_Classes
//{
//    public class ConvertBase64ToImage
//    {
//        //[WebMethod]
//        //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
//        public void Base64ToImage(string imagestr)
//        {
          

//            try
//            {//1
//                if (!string.IsNullOrEmpty(imagestr))
//                {
//                    var dataparts = imagestr.Split(',');
//                    if (dataparts.Length > 1)
//                    {
//                        imagestr = dataparts[1];
//                    }

//                    var convertImage = Convert.FromBase64String(imagestr);
//                    string imageName = "customer.Id" + "-" + Guid.NewGuid().ToString();
//                    string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Files/" + Path.GetFileName(imageName));
//                    System.IO.File.WriteAllBytes(filePath, convertImage);
//                }
//                //2
//                    //string DefaultImagePath = HttpContext.Current.Server.MapPath("~/c:/image");

//                //byte[] bytes = Convert.FromBase64String(imagestr);

//                //using (MemoryStream ms = new MemoryStream(bytes))
//                //{
//                //    Image pic = Image.FromStream(ms);

//                //    pic.Save(DefaultImagePath);
//                //}
               
//            }
//            catch (Exception ex)
//            {

//            }
//        }
//    }
//}
