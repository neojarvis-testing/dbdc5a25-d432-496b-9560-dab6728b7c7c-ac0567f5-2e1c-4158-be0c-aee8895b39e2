import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-navbar', // Component selector
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  isAdmin: boolean = false; // Set to false for user role
  Username: string = ''; // Placeholder for the actual username
  role: string = this.isAdmin ? 'Admin' : 'User'; // Role based on user status
  showLogoutModel: boolean = false; // To manage logout confirmation modal visibility

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.Username = localStorage.getItem('userName') || 'Guest'; // Assuming username is stored in localStorage
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