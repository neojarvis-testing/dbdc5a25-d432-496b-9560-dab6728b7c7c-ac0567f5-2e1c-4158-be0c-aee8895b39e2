using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using System.Collections.Generic;
using System.Threading.Tasks; 
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
 
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnnouncementsController : ControllerBase
    {
        private readonly AnnouncementService _announcementService;
 
        public AnnouncementsController(AnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }
 
        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAllAnnouncements()
        {
            try
            {
                var announcements = await _announcementService.GetAllAnnouncements();
                return Ok(announcements);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult<Announcement>> GetAnnouncementById(int id)
        {
            try
            {
                var announcement = await _announcementService.GetAnnouncementById(id);
                if (announcement == null)
                {
                    return NotFound("Announcement not found");
                }
                return Ok(announcement);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        [HttpPost]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult> AddAnnouncement([FromBody] Announcement announcement)
        {
            try
            {
                await _announcementService.AddAnnouncement(announcement);
                return Ok(new { message = "Announcement added successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult> UpdateAnnouncement(int id, [FromBody] Announcement announcement)
        {
            if (id != announcement.AnnouncementId)
            {
                return BadRequest();
            }
 
            try
            {
                var result = await _announcementService.UpdateAnnouncement(id, announcement);
                if (!result)
                {
                    return NotFound("Announcement not found");
                }
                return Ok("Announcement updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
 
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] 
        public async Task<ActionResult> DeleteAnnouncement(int id)
        {
            try
            {
                var result = await _announcementService.DeleteAnnouncement(id);
                if (!result)
                {
                    return NotFound("Announcement not found");
                }
                return Ok("Announcement deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}