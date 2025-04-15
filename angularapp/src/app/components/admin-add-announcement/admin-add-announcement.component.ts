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

  constructor(private announcementService: AnnouncementService) {}

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.announcementService.addAnnouncement(this.announcement).subscribe(
        response => {
          alert('Announcement Added Successfully!');
          form.resetForm();
          this.formSubmitted = false;
        },
        error => {
          if (error.status === 409) {
            alert('Title already exists');
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      );
    }
  }
}
