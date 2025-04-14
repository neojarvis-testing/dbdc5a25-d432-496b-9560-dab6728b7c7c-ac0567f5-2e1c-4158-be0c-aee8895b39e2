import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-announcement',
  templateUrl: './admin-view-announcement.component.html',
  styleUrls: ['./admin-view-announcement.component.css']
})
export class AdminViewAnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  searchTitle: string = '';

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      (data) => {
        this.announcements = data;
        this.filteredAnnouncements = data; // Initialize filtered list
      },
      (error) => {
        this.errorMessage = 'Error fetching announcements. Please try again later.';
        console.error(error);
      }
    );
  }

  searchAnnouncements(): void {
    this.filteredAnnouncements = this.announcements.filter((announcement) =>
      announcement.Title.toLowerCase().includes(this.searchTitle.toLowerCase())
    );
  }

  updateStatus(announcement: Announcement, status: string): void {
    announcement.Status = status;
    this.announcementService.updateAnnouncement(announcement.AnnouncementId!, announcement).subscribe({
      next: () => {
        this.successMessage = `Announcement marked as ${status}.`;
        this.hideMessagesAfterDelay();
      },
      error: (error) => {
        this.errorMessage = 'Error updating status. Please try again.';
        console.error(error);
        this.hideMessagesAfterDelay();
      }
    });
  }

  editAnnouncement(announcementId: number): void {
    this.router.navigate(['/admin-add-announcement'], { queryParams: { id: announcementId } });
  }

  deleteAnnouncement(announcementId: number): void {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.announcementService.deleteAnnouncement(announcementId).subscribe({
        next: () => {
          this.successMessage = 'Announcement deleted successfully.';
          this.getAnnouncements(); // Refresh the table
        },
        error: (error) => {
          this.errorMessage = 'Error deleting announcement. Please try again.';
          console.error(error);
        }
      });
    }
  }

  hideMessagesAfterDelay(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000); // Clear messages after 3 seconds
  }
}

