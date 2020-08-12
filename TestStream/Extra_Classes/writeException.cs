using TestStream.Data;
using TestStream.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Extra_Classes
{
    public class writeException
    {
       // static ApplicationDbContext db = new ApplicationDbContext();

        public static exceptionLog log = null;


        public static void Write(string exceptionText, DateTime exceptionDateTime, string controllerName, string actionName, string areaName)
        {

            exceptionLog log = new exceptionLog();
            //log.Id = Id;
            log.exceptionText = exceptionText;
            log.exceptionDateTime = exceptionDateTime;
            log.controllerName = controllerName;
            log.actionName = actionName;
            log.areaName = areaName;

            try
            {
                //db.exceptionLogs.Add(log);
               // db.SaveChanges();
            }
            catch (Exception e)
            {

                throw;

            }
        }
    }
}
