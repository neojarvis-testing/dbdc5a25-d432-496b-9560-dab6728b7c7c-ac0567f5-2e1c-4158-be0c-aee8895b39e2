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
  showDeleteConfirm = false;
  deleteId: number;

  constructor(private announcementService: AnnouncementService, private router: Router) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementService.getAllAnnouncements().subscribe(data => {
      this.announcements = data;
    });
  }

  confirmDelete(id: number) {
    this.showDeleteConfirm = true;
    this.deleteId = id;
  }

  deleteAnnouncement() {
    this.announcementService.deleteAnnouncement(this.deleteId).subscribe(() => {
      this.loadAnnouncements();
      this.showDeleteConfirm = false;
    });
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }
}
