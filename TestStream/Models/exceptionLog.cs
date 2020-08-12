using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models
{
    public class exceptionLog
    {
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(1500)]
        public string exceptionText { get; set; }
        public Nullable<DateTime> exceptionDateTime { get; set; }
        [MaxLength(1500)]
        public string controllerName { get; set; }
        [MaxLength(1500)]
        public string actionName { get; set; }
        [MaxLength(1500)]
        public string areaName { get; set; }
    }
}
