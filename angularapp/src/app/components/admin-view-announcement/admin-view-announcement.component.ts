import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-admin-view-announcement',
  templateUrl: './admin-view-announcement.component.html',
  styleUrls: ['./admin-view-announcement.component.css']
})
export class AdminViewAnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  searchTerm: string = '';
  showDeletePopup: boolean = false;
  announcementToDelete: number | null = null;
  successMessage: string = '';

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data;
        this.filteredAnnouncements = data;
      }
    });
  }

  search(): void {
    this.filteredAnnouncements = this.announcements.filter(a =>
      a.Title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  editAnnouncement(id: number): void {
    this.router.navigate(['/adminaddannouncement'], { queryParams: { id } });
  }

  confirmDelete(id: number): void {
    this.announcementToDelete = id;
    this.showDeletePopup = true;
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
    this.announcementToDelete = null;
  }

  deleteAnnouncement(): void {
    if (this.announcementToDelete !== null) {
      this.announcementService.deleteAnnouncement(this.announcementToDelete).subscribe({
        next: () => {
          this.successMessage = 'Announcement deleted successfully!';
          this.loadAnnouncements();
          this.cancelDelete();
        }
      });
    }
  }

  toggleStatus(announcement: Announcement): void {
    const updatedAnnouncement = { ...announcement, Status: announcement.Status === 'Active' ? 'Inactive' : 'Active' };
    this.announcementService.updateAnnouncement(announcement.AnnouncementId!, updatedAnnouncement).subscribe({
      next: () => {
        this.successMessage = 'Announcement Updated Successfully!';
        this.loadAnnouncements();
      },
      error: (err) => {
        if (err.error.includes('Title already exists')) {
          alert('Title already exists!');
        } else {
          alert('Something went wrong while updating status.');
        }
      }
    });
  }
}