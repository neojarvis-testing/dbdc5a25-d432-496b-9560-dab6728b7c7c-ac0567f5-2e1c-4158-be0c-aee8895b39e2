import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model'; 
import Swal from 'sweetalert2'; // Import SweetAlert for better error/success messages

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
    PublishedDate: new Date(),
    Category: '',
    Priority: '',
    Status: ''
  };

  formSubmitted: boolean = false;
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(
    private announcementService: AnnouncementService,
    private router: Router // Inject Router for navigation
  ) {}

  // Method triggered on form submission
  onSubmit(form: NgForm): void {
    this.formSubmitted = true; // Mark form as submitted
    if (form.valid) {
      this.isLoading = true; // Show loading state
      this.announcementService.addAnnouncement(this.announcement).subscribe({
        next: (response) => {
          console.log('Success Response:', response); // Debugging success response
          this.successMessage = 'Announcement added successfully!';
          Swal.fire({
            title: 'Success!',
            text: this.successMessage,
            icon: 'success',
            confirmButtonText: 'OK'
          });

          form.resetForm(); // Reset the form
          this.formSubmitted = false; // Reset the form submission state
          this.isLoading = false; // Reset loading state

          // Navigate to the view page after success
          this.router.navigate(['/adminviewannouncement']);
        },
        error: (error) => {
          console.error('Error Response:', error); // Debugging error response
          this.isLoading = false; // Reset loading state
          if (error.status === 409) {
            Swal.fire({
              title: 'Error',
              text: 'Title already exists. Please use a different title.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'An error occurred. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
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
