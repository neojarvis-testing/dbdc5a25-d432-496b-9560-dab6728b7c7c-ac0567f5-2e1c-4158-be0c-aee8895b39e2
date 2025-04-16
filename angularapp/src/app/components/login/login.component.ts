import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
 
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
 
  login() {
    if (this.user.Email && this.user.Password) {
      this.authService.login(this.user).subscribe(
        response => {
          console.log('Login successful', response);
          this.loginError = null;
          this.loginSuccess = true;
          // Delay for 3 seconds before redirecting
          const userRole = localStorage.getItem('userRole');
          if(userRole==='Admin'){
            this.router.navigate([`/adminnavbar`]);
          }
          else if(userRole==='User'){
            this.router.navigate([`/usernavbar`]);
          }
          else{
            this.router.navigate([`/home`]);
          }
        },
        error => {
          console.log('Login error', error);
          this.loginError = 'Invalid email or password';
          this.loginSuccess = false;
        }
      );
    }
  }
 
  resetLoginError() {
    this.loginError = null;
    this.loginSuccess = false;
  }
 
  register(): void{
    this.router.navigate(['/register']);
  }
}