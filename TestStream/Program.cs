using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace TestStream
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var host = CreateWebHostBuilder(args).UseKestrel().UseIISIntegration().UseIIS()
                .Build();

            host.Run();

        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
                   WebHost.CreateDefaultBuilder(args)
                       .UseStartup<Startup>();


    }
}
