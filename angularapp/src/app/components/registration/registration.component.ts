import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  mobileNumber: string = '';
  role: string = '';

  usernameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;
  confirmPasswordError: string | null = null;
  mobileNumberError: string | null = null;
  roleError: string | null = null;

  isFormValid: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  validateForm(): void {
    this.usernameError = this.username ? null : 'Username is required.';
    this.emailError = this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) ? null : 'Invalid email format.';
    this.passwordError = this.password.length >= 6 ? null : 'Password must be at least 6 characters.';
    this.confirmPasswordError = this.confirmPassword === this.password ? null : 'Passwords do not match.';
    this.mobileNumberError = this.mobileNumber && /^[0-9]{10}$/.test(this.mobileNumber) ? null : 'Mobile number must be 10 digits.';
    this.roleError = this.role ? null : 'Role is required.';
    this.isFormValid = !this.usernameError && !this.emailError && !this.passwordError &&
                       !this.confirmPasswordError && !this.mobileNumberError && !this.roleError;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      const registrationData = {
        username: this.username,
        email: this.email,
        password: this.password,
        mobileNumber: this.mobileNumber,
        role: this.role
      };

      this.http.post('https://ide-cdebaaabaaceadafebfecdebbceacfecbecaeebe.premiumproject.examly.io/proxy/8080/api/register', registrationData).subscribe({
        next: () => {
          alert('Registration successful! Redirecting to login page...');
          this.router.navigate(['/login']); // Navigate to the login page after successful registration
        },
        error: (err) => {
          if (err.status === 409) {
            alert('User already exists');
          } else {
            alert('Registration failed. Please try again.');
          }
        }
      });
    }
  }
}