using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models.ApiModels.Customer
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StreamKey { get; set; }
        public string Url { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string LatinName { get; set; }
        public Guid KeyStream { get; set; }
        public bool Famous { get; set; }
        public bool IsActive { get; set; }
        public string StreamUrl { get; set; }
    }
}
