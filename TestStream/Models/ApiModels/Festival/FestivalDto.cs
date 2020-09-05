using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models.ApiModels.Festival
{
    public class FestivalDto
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
        public int fileTypeId { get; set; }
        public int FestivalFileTypeId { get; set; }
        public List<IFormFile> FormFile { get; set; }

    }
}
