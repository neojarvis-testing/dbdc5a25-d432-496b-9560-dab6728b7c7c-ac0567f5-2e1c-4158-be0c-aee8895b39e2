import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private baseUrl = 'https://ide-ceaeccbebfffaedadafebfecdebbceacfecbecaeebe.premiumproject.examly.io/proxy/8080';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}/api/blogposts`, { headers: this.getAuthHeaders() });
  }

  getBlogPostById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.baseUrl}/api/blogposts/${id}`, { headers: this.getAuthHeaders() });
  }

  addBlogPost(blogPost: BlogPost): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/blogposts`, blogPost, { headers: this.getAuthHeaders() });
  }

  updateBlogPost(id: number, blogPost: BlogPost): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/blogposts/${id}`, blogPost, { headers: this.getAuthHeaders() });
  }

  deleteBlogPost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/blogposts/${id}`, { headers: this.getAuthHeaders() });
  }
}