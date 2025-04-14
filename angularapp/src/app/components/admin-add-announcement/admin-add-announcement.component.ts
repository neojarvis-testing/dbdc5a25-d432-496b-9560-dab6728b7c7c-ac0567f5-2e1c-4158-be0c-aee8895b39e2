import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-admin-add-announcement',
  templateUrl: './admin-add-announcement.component.html',
  styleUrls: ['./admin-add-announcement.component.css']
})
export class AdminAddAnnouncementComponent {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private announcementService: AnnouncementService) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'All fields are required';
      this.successMessage = ''; // Clear success message
      return;
    }

    this.announcementService.addAnnouncement(form.value).subscribe({
      next: () => {
        this.successMessage = 'Announcement Added Successfully!';
        this.errorMessage = ''; // Clear error message
        form.reset();
        this.hideMessagesAfterDelay();
      },
      error: (error) => {
        this.successMessage = ''; // Clear success message
        if (error.status === 409) { // Example for duplicate title error
          this.errorMessage = 'Title already exists. Please choose a different title.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        this.hideMessagesAfterDelay();
      }
    });
  }

  hideMessagesAfterDelay(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000); // Messages disappear after 3 seconds
  }
}
