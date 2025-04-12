using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options){}

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<BlogPost> BlogPosts { get; set; }

        public DbSet<Announcement> Announcements { get; set; }

    }
}