import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'; // SweetAlert2 library for popups

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
  
  // Password visibility toggles
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Handles the registration process
  onRegister(): void {
    // Password matching check
    if (this.password !== this.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    // Complete the registration directly
    this.completeRegistration();
  }

  // Completes the registration process by sending the data to the backend
  private completeRegistration(): void {
    const registrationData = {
      Username: this.username,
      Email: this.email,
      Password: this.password,
      MobileNumber: this.mobileNumber,
      UserRole: this.userRole
    };

    console.log('Registration Data:', registrationData); // Logging registration data for debugging

    this.authService.register(registrationData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        Swal.fire('Success', 'You have successfully registered!', 'success').then(() => {
          this.router.navigate(['/login']); // Navigate to login page on success
        });
      },
      error: (err) => {
        console.error('Registration failed:', err);

        // Handle validation errors or other issues
        if (err.error && err.error.errors) {
          Swal.fire('Error', `Validation Errors: ${JSON.stringify(err.error.errors)}`, 'error');
        } else {
          Swal.fire('Error', 'Registration failed. Please check your input and try again.', 'error');
        }
      }
    });
  }

  // Toggles visibility for password or confirm password fields
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }
}