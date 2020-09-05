using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class Response
    {
        public int CountPage { set; get; }
        public string Message { set; get; }
        public bool Status { set; get; }
        public object Data { set; get; }

    }
}
