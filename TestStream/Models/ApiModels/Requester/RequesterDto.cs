using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models.ApiModels.Requester
{
    public class RequesterDto
    {
        public int Id { get; set; }
        public string BoardName { get; set; }
        public string TrusteeName { get; set; }
        public string AgentName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string DailySchedule { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public bool Processed { get; set; }
        public string eventCity { get; set; }
        public string Description { get; set; }
        public string ReviewerOpinion { get; set; }
    }
}
