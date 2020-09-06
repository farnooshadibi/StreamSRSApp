using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class Festival
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public DateTime SubmitDate { get; set; }
        public bool Processed { get; set; }
        public string Result { get; set; }
        public string TrackingCode { get; set; }
        public int Like { get; set; }
        public bool Approve { get; set; }
        public int FestivalFileTypeId { get; set; }
        public string WorkName { get; set; }
        public ICollection<FestivalFile> festivalFiles { get; set; }
        public ICollection<Comment> comments { get; set; }
    }
}
