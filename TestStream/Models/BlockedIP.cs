using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class BlockedIP
    {
        public int Id { get; set; }
        public string StreamKey { get; set; }
        public string IP { get; set; }
        public string tcUrl { get; set; }
        public string url { get; set; }
        public string type { get; set; }
    }
}
