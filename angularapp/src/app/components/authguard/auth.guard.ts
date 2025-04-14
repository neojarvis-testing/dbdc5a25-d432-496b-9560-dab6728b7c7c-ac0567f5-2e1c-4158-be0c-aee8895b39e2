import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthService, private router: Router) {}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

console.log('AuthGuard invoked');
// Check if the user is logged in
if (!this.authService.isLoggedIn()) {
  console.log('User not logged in, redirecting to /error');
  this.router.navigate(['/error'], { queryParams: { message: 'User not logged in' } });
  return false;
}
// Check the user's role and the target URL
const userRole = this.authService.getUserRole();
const targetUrl = state.url;
console.log(`User role: ${userRole}, Target URL: ${targetUrl}`);
// Define role-based access logic
if ((userRole === 'Admin' && targetUrl.includes('/user')) || 
    (userRole === 'User' && targetUrl.includes('/admin'))) {
  // Redirect to error page if the role does not match the target URL
  console.log('Role does not match target URL, redirecting to /error');
  this.router.navigate(['/error'], { queryParams: { message: 'Access Denied: Role does not match target URL' } });
  return false;
}
console.log('Access granted');
return true;
}
}