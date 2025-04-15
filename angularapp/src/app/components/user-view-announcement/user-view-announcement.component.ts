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
  searchQuery = '';

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements(): void {
    this.announcementService.getAllAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  get filteredAnnouncements() {
    return this.announcements.filter(announcement =>
      announcement.Title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
