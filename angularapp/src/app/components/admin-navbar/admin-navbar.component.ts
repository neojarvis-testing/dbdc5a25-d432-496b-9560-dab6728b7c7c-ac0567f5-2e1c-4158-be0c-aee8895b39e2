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
  userId: number;
  showLogoutModel: boolean = false; // For showing logout confirmation modal
  showMenu: boolean = false; // For toggling the hamburger menu

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    // Get stored user details (provide fallback values if needed)
    this.userId = parseInt(localStorage.getItem('userId')!, 10);
    this.Username = localStorage.getItem('userName') || 'User';
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
      dropdown.classList.toggle('show');
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
