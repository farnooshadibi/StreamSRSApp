using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class PlayList
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
        //[ForeignKey("CustomerId")]
        //public virtual Customer Customer { get; set; }
        public int CustomerId { get; set; }
    }
}
