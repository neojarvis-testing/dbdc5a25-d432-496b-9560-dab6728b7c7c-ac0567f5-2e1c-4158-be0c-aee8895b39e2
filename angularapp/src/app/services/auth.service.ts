import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = "https://8080-dedadddddbafecbafcedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io";
  private currentUserRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserRole.next(this.getUserRoleFromToken(token));
    }
  }

  login(credentials: Login): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/api/login`, credentials).subscribe(
        response => {
          const token = response.token;
          localStorage.setItem('token', token);

          const role = this.getUserRoleFromToken(token);
          const userId = this.getUserIdFromToken(token);
          const userName = this.getUserNameFromToken(token);

          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          this.currentUserRole.next(role);

          observer.next(response);
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    this.currentUserRole.next(null);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  getUserRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (error) {
      console.error("Error decoding token role:", error);
      return null;
    }
  }

  getUserIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (error) {
      console.error("Error decoding token userId:", error);
      return null;
    }
  }

  getUserNameFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    } catch (error) {
      console.error("Error decoding token userName:", error);
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
    return this.getUserRole() === 'Admin';
  }

  isUser(): boolean {
    return this.getUserRole() === 'User';
  }
}

//corrected