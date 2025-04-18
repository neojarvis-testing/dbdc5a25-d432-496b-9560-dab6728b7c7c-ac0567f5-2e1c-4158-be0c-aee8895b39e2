import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'; // SweetAlert2 library for popups
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // Form fields
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  userRole: string = '';
  adminCode: string = ''; // New field for admin code
  
  // Password visibility toggles
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Handles the registration process.
  onRegister(): void {
    // Check if passwords match.
    if (this.password !== this.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    // Check if admin code is required and valid.
    const validAdminCode = 'Adminkey'; // Replace with your actual admin code
    if (this.userRole === 'Admin' && this.adminCode !== validAdminCode) {
      Swal.fire('Error', 'Invalid admin code', 'error');
      return;
    }

    // Proceed with registration.
    this.completeRegistration();
  }

  // Completes the registration by sending data to the backend.
  private completeRegistration(): void {
    const registrationData = {
      Username: this.username,
      Email: this.email,
      Password: this.password,
      MobileNumber: this.mobileNumber,
      UserRole: this.userRole
    };

    console.log('Registration Data:', registrationData);

    this.authService.register(registrationData).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        // Check and display specific messages.
        if (response.message === 'User created successfully!') {
          Swal.fire('Success', response.message, 'success').then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          // If the success response does not match the expected message, show it as an error.
          Swal.fire('Error', response.message || 'Registration encountered an issue.', 'error');
        }
      },
      error: (err) => {
        console.error('Registration failed:', err);
        // Back-end may return a string message in error.error directly.
        let errorMsg = 'Registration failed. Please check your input and try again.';
        if (err.error) {
          if (err.error === 'User already exists') {
            errorMsg = 'User already exists. Please use a different email or username.';
          } else if (err.error === 'User creation failed! Please check user details and try again.') {
            errorMsg = 'User creation failed! Please check your details and try again.';
          } else {
            errorMsg = err.error;
          }
        }
        Swal.fire('Error', errorMsg, 'error');
      }
    });
  }

  // Toggles password or confirm password visibility.
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
