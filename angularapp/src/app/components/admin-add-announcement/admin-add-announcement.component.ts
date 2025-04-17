import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-announcement',
  templateUrl: './admin-add-announcement.component.html',
  styleUrls: ['./admin-add-announcement.component.css']
})
export class AdminAddAnnouncementComponent {
  // Announcement object with default values
  announcement: Announcement = {
    Title: '',
    Content: '',
    PublishedDate: new Date(), // Using ISO string for consistency
    Category: '',
    Priority: '',
    Status: ''
  };

  formSubmitted: boolean = false;
  isLoading: boolean = false;
  successMessage: string = '';

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
          this.router.navigate(['/adminviewannouncement']);
        },
        (error) => {
          // In case of error, display the error message returned from the backend.
          this.isLoading = false;
          console.error('Error response:', error);
          this.successMessage = error.error?.message || 'An error occurred. Please try again.';
        }
      });
    } else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}
