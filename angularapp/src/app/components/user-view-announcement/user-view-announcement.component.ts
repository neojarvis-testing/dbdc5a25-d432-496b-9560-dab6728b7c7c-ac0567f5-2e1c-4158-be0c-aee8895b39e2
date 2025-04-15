import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from 'src/app/services/announcement.service'; 

@Component({
  selector: 'app-user-view-announcement',
  templateUrl: './user-view-announcement.component.html',
  styleUrls: ['./user-view-announcement.component.css']
})
export class UserViewAnnouncementComponent implements OnInit {
  announcements: any[] = [];
  searchQuery = '';

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements(): void {
    this.announcementService.getAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  get filteredAnnouncements() {
    return this.announcements.filter(announcement =>
      announcement.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
