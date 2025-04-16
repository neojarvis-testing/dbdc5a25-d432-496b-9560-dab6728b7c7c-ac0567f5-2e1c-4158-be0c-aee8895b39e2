
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  // https://ide-dedadddddbafecbafcedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io/proxy/8080/
  private apiUrl = 'https://8080-ceaeccbebfffaedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/api/announcements`, { headers: this.getAuthHeaders() });
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    const url = `${this.apiUrl}/api/announcements/${id}`;
    return this.http.get<Announcement>(url, { headers: this.getAuthHeaders() });
  }

  addAnnouncement(announcement: Announcement): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/announcements`, announcement, { headers: this.getAuthHeaders() });
  }

  updateAnnouncement(id: number, announcement: Announcement): Observable<any> {
    const url = `${this.apiUrl}/api/announcements/${id}`;
    return this.http.put(url, announcement, { headers: this.getAuthHeaders() });
  }

  deleteAnnouncement(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/announcements/${id}`;
    return this.http.delete(url, { headers: this.getAuthHeaders() });
  }
}
