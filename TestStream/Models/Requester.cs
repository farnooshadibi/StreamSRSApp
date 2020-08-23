using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class Requester
    {
        public int Id { get; set; }
        public string BoardName { get; set; }
        public string TrusteeName { get; set; }
        public string AgentName { get; set; }
        public string PhoneNumber  { get; set; }
        public string Email { get; set; }
        public string DailySchedule { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool Processed { get; set; }

    }
}
