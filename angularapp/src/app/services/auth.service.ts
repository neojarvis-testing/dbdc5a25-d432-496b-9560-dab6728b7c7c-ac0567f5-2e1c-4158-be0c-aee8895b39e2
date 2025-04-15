import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, tap } from "rxjs/operators"
import { Login } from '../models/login.model';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  public baseUrl = 'https://8080-dedadddddbafecbafced326575073bfaedbcacacddaone.premiumproject.examly.io'
 
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
 
  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
 
  private get currentUserValue():User{
    return this.currentUserSubject.value;
  }
 
  register(newUser: User):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/api/register`, newUser);
  }
 
  login(loginUser: Login): Observable<any> {
    console.log(JSON.stringify(loginUser));
    return this.http.post<any>(`${this.baseUrl}/api/login`, loginUser).pipe(
      tap(response => {
        const user=response.user;
        // console.log("Extracted user:"+JSON.stringify());
        localStorage.setItem('role', response.role);
        localStorage.setItem('currentUser', JSON.stringify(user)); // change here for all test cases
      }),
      catchError(this.handleError<any>('login'))
    );
  }
 
  logout(): void {
    // localStorage.clear();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
  }
 
  // private storeUserData(user: any): void {
  //   localStorage.setItem('token', user.token);
  //   localStorage.setItem('role', user.role);
  // }
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
 
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }
 
  isOrganizer(): boolean {
    return localStorage.getItem('role') === 'User';
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => new Error(`${operation} failed: ${error.message}`));
    };
  }
}
 