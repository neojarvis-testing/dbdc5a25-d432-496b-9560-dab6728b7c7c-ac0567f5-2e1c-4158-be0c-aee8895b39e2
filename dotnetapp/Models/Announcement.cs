using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }

    }
}