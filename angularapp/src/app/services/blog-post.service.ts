import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private baseUrl = 'https://8080-abfbbbdabfccfffadafebfecdebbceacfecbecaeebe.premiumproject.examly.io/';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Fetch the token from localStorage.
    return new HttpHeaders({
      'Authorization': `Bearer ${token}` // Add 'Bearer' prefix to the token.
    });
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getBlogPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addBlogPost(blogPost: BlogPost): Observable<any> {
    return this.http.post(this.baseUrl, blogPost, { headers: this.getAuthHeaders() });
  }

  updateBlogPost(id: number, blogPost: BlogPost): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, blogPost, { headers: this.getAuthHeaders() });
  }

  deleteBlogPost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
