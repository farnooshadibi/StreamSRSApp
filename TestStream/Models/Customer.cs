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
        public ICollection<PlayList> playLists { get; set; }
    }
}
