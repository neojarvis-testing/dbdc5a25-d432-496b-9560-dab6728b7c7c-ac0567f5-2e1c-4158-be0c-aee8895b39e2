import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Feedback } from '../models/feedback.model';
<<<<<<< HEAD
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
 
=======
import { environment } from 'src/environments/environment';

>>>>>>> 74851616101f75fca2b9a65738cd5fe3c89c8e94
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
<<<<<<< HEAD
  private apiUrl = environment.apiUrl;
 
  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
=======

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
>>>>>>> 74851616101f75fca2b9a65738cd5fe3c89c8e94
  }
  sendFeedback(feedback: Feedback): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, feedback, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  getUserbyId(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/api/users`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError));
  }
  
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}