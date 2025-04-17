import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service'; 
import { Announcement } from 'src/app/models/announcement.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-announcement',
  templateUrl: './admin-add-announcement.component.html',
  styleUrls: ['./admin-add-announcement.component.css']
})
export class AdminAddAnnouncementComponent {
  announcement: Announcement = {
    Title: '',
    Content: '',
    PublishedDate: new Date(), // Using ISO string for consistency
    Category: '',
    Priority: '',
    Status: ''
  };

  formSubmitted = false;
  isLoading = false;
  successMessage = '';

  constructor(private announcementService: AnnouncementService, private router:Router) {}

  onSubmit(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.isLoading = true;
      this.announcementService.addAnnouncement(this.announcement).subscribe(
        (response: any) => {
          // Successful response—display the message from the backend.
          this.isLoading = false;
          this.router.navigate([`/adminviewannouncement`]);
          this.successMessage = response.message || 'Announcement added successfully!';
          form.resetForm();
          this.formSubmitted = false;
        },
        (error) => {
          // In case of error, display the error message returned from the backend.
          this.isLoading = false;
          console.error('Error response:', error);
          this.successMessage = error.error?.message || 'An error occurred. Please try again.';
        }
      );
    }
  }
}
