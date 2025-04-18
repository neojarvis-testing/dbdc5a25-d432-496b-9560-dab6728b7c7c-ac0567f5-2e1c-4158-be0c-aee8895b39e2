import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Login = new Login();
  loginError: string | null = null;
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    if (this.user.Email && this.user.Password) {
      this.authService.login(this.user).subscribe(
        response => {
          console.log('Login successful', response);
          this.loginError = null;
          this.loginSuccess = true;

          // Store token from backend response in localStorage.
          localStorage.setItem('token', response.token);

          // If response does not contain userRole, decode the token.
          if (response.userRole) {
            localStorage.setItem('userRole', response.userRole);
          } else {
            try {
              // Cast jwt_decode as a callable function.
              const decodedToken: any = (jwt_decode as any)(response.token);
              if (decodedToken && decodedToken.role) {
                localStorage.setItem('userRole', decodedToken.role);
              } else {
                console.error('User role not found in decoded token.');
              }
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          }

          // Redirect based on user role stored in localStorage.
          const userRole = localStorage.getItem('userRole');
          if (userRole === 'Admin') {
            this.router.navigate(['/home']);
          } else if (userRole === 'User') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.error('Login error', error);
          // Check for error message in the response error property.
          if (error.error) {
            if (error.error === 'Invalid Password') {
              this.loginError = 'Incorrect password. Please try again.';
            } else if (error.error === 'Invalid email') {
              this.loginError = 'Incorrect email. Please try again.';
            } else {
              this.loginError = error.error;
            }
          } else {
            this.loginError = 'Invalid email or password';
          }
          this.loginSuccess = false;
          localStorage.removeItem('userRole');
          localStorage.removeItem('token');
        }
      );
    }
  }

  resetLoginError(): void {
    this.loginError = null;
    this.loginSuccess = false;
  }

  register(): void {
    this.router.navigate(['/register']);
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
  
}
