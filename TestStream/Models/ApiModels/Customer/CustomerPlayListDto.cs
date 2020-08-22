using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestStream.Models;

namespace TestStream.Models.ApiModels.Customer
{
    public class CustomerPlayListDto
    {
        //public int Id { get; set; }
         public string Name { get; set; }
        //public int StreamKey { get; set; }
        public string Url { get; set; }
        //public string Image { get; set; }
        public CustomerDto customers { get; set; }
        public DateTime StartTime { get; set; }
    }
}
