import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service'; 
import { Announcement } from 'src/app/models/announcement.model'; 

@Component({
  selector: 'app-admin-add-announcement',
  templateUrl: './admin-add-announcement.component.html',
  styleUrls: ['./admin-add-announcement.component.css']
})
export class AdminAddAnnouncementComponent {
  announcement: Announcement = {
    Title: '',
    Content: '',
    PublishedDate: new Date(),
    Category: '',
    Priority: '',
    Status: ''
  };

  formSubmitted = false;
  isLoading = false;
  successMessage = '';

  constructor(private announcementService: AnnouncementService) {}

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.isLoading = true;
      this.announcementService.addAnnouncement(this.announcement).subscribe(
        response => {
          this.successMessage = 'Announcement added successfully!';
          form.resetForm();
          this.formSubmitted = false;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          if (error.status === 409) {
            this.successMessage = 'Title already exists';
          } else {
            this.successMessage = 'An error occurred. Please try again.';
          }
        }
      );
    }
  }
}
