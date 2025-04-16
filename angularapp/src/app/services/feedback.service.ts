import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'https://ide-ceaeccbebfffaedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io/proxy/8080';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/feedback`, feedback, {
      headers: this.getAuthHeaders()
    });
  }

  getAllFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/api/feedback/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteFeedback(feedbackId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/feedback/${feedbackId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/api/feedback`, {
      headers: this.getAuthHeaders()
    });
  }
}