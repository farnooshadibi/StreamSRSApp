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
        public Guid KeyStream { get; set; }
        public string Url { get; set; }
        public string Image { get; set; }
        public bool IsActive { get; set; }
        public bool Famous { get; set; }
        public string Token { get; set; }
        public string LatinName { get; set; }
        public string Description { get; set; }
        public ICollection<PlayList> playLists { get; set; }
    }
}
