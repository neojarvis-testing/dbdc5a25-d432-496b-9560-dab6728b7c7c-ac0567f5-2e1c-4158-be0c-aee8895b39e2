import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-admin-navbar', // Keeping the original selector
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  isAdmin: boolean = true; // Set to true if the user is an admin
  Username: string = ''; // Placeholder for the actual username
  role: string = this.isAdmin ? 'Admin' : 'User'; // Role based on admin status
  userId: number; // To store the user ID
  showLogoutModel: boolean = false; // To manage logout confirmation modal visibility

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!, 10); // Assuming userId is stored in localStorage
    this.Username = localStorage.getItem('userName'); // Assuming username is stored in localStorage
  }

  logout(): void {
    this.showLogoutModel = true; // Display the logout modal
  }

  confirmLogout(): void {
    this.showLogoutModel = false; // Hide the modal
    this.authService.logout();
    this.router.navigate(['/login']); // Navigate to the login page
  }

  cancelLogout(): void {
    this.showLogoutModel = false; // Hide the modal
  }

  toggleDropdown(event: Event): void {
    event.preventDefault();
    const dropdown = (event.currentTarget as HTMLElement).closest('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show'); // Toggle the 'show' class for the dropdown
    }
  }
}