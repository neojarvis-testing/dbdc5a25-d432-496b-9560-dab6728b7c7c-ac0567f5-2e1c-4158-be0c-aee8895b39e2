import { Injectable, Optional } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = "https://8080-cdebaaabaaceadafebfecdebbceacfecbecaeebe.premiumproject.examly.io";
  private currentUserRole = new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserRole.next(this.getUserRoleFromToken(token));
    }
  }
  login(credentials: Login): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/api/login`, credentials).subscribe( // Ensure this URL matches your backend endpoint
        response => {
          localStorage.setItem('token', response.token);
          const role = this.getUserRoleFromToken(response.token);
          const userId = this.getUserIdFromToken(response.token);
          const userName = this.getUserNameFromToken(response.token);
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          this.currentUserRole.next(role);
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.currentUserRole.next(null);
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }
  getUserRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      return role || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getUserIdFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getUserNameFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      return userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN';
  }
  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'USER';
  }
}