using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Models.ApiModels.Festival
{
    public class FileModel
    {
        //public string FileName { get; set; }
        public List<IFormFile> FormFile { get; set; }
    }
}
