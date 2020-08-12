using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StreamKey { get; set; }
        public string Url { get; set; }
        public string Image { get; set; }
    }
}
