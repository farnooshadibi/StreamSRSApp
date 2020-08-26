using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models.ApiModels.PlayList
{
    public class PlayListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime Duration { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string PerformerName { get; set; }
        public string Lamenter { get; set; }
        public string EventPlace { get; set; }
        public bool IsActive { get; set; }
        public int CustomerId { get; set; }

        public double IntervalSec { get; set; }
    }
}
