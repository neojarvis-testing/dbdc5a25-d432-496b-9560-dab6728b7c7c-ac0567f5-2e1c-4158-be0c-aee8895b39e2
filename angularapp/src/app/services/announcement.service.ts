import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from '../models/announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private baseUrl = '/api/announcements';

  constructor(private http: HttpClient) {}

  getAllAnnouncements(): Observable<Announcement[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Announcement[]>(this.baseUrl, { headers });
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    const headers = this.createAuthHeaders();
    return this.http.get<Announcement>(`${this.baseUrl}/${id}`, { headers });
  }

  addAnnouncement(announcement: Announcement): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(this.baseUrl, announcement, { headers });
  }

  updateAnnouncement(id: number, announcement: Announcement): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.baseUrl}/${id}`, announcement, { headers });
  }

  deleteAnnouncement(id: number): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
