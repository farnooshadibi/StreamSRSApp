﻿using TestStream.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestStream.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        public DbSet<Customer> customers { get; set; }
        public DbSet<Admin> admins { get; set; }
        public DbSet<Shrine> shrines { get; set; }
        public DbSet<PlayList> playLists { get; set; }
        public DbSet<BlockedIP> blockedIPs { get; set; }
        public DbSet<Requester> requesters { get; set; }
        public DbSet<Service> services { get; set; }
    }
}
