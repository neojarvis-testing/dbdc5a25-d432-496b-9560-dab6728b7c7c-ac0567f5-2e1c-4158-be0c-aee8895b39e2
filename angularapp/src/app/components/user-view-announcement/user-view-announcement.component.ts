import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';

@Component({
  selector: 'app-user-view-announcement',
  templateUrl: './user-view-announcement.component.html',
  styleUrls: ['./user-view-announcement.component.css']
})
export class UserViewAnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  errorMessage: string = '';
  searchTitle: string = '';
  searchCategory: string = '';

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(
      (data) => {
        this.announcements = data;
        this.filteredAnnouncements = data; // Initialize the filtered list
      },
      (error) => {
        this.errorMessage = 'Error fetching announcements. Please try again later.';
        console.error(error);
      }
    );
  }

  onFilter(): void {
    this.filteredAnnouncements = this.announcements.filter((announcement) =>
      (this.searchTitle === '' || announcement.Title.toLowerCase().includes(this.searchTitle.toLowerCase())) &&
      (this.searchCategory === '' || announcement.Category.toLowerCase().includes(this.searchCategory.toLowerCase()))
    );
  }

  onResetFilter(): void {
    this.searchTitle = '';
    this.searchCategory = '';
    this.filteredAnnouncements = this.announcements; // Reset to the full list
  }
}
