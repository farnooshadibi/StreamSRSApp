using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class FestivalFile
    {
        public int Id { get; set; }
        public string FileURL { get; set; }
        public int FestivalId { get; set; }
        public bool Approve { get; set; }
    }
}
