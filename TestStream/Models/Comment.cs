using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public int FestivalId { get; set; }
        public DateTime SubmitDate { get; set; }
        public bool Approve { get; set; }
    }
}
