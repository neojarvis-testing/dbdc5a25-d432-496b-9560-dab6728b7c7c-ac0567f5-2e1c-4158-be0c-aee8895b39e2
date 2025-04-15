import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerUrl = '/api/register'; // Replace with your endpoint
  private loginUrl = '/api/login'; // Replace with your endpoint

  // BehaviorSubjects to track user role and ID
  private userRoleSubject = new BehaviorSubject<string>(''); 
  private userIdSubject = new BehaviorSubject<number>(0); 

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: User): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  // Login user and store JWT token in localStorage
  login(login: Login): Observable<any> {
    return this.http.post(this.loginUrl, login).pipe((response: any) => {
      const token = response.token;
      const role = response.role;
      const userId = response.id;

      if (token) {
        localStorage.setItem('authorizationToken', token);
        this.userRoleSubject.next(role);
        this.userIdSubject.next(userId);
      }

      return response;
    });
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authorizationToken');
    return token !== null; // User is logged in if the token exists
  }

  // Method to get the user's role as a string (for AuthGuard)
  getUserRole(): string {
    return localStorage.getItem('userRole') || ''; // Role retrieved from localStorage
  }

  // Method to get the user's ID as a number
  getUserId(): Observable<number> {
    return this.userIdSubject.asObservable();
  }
}