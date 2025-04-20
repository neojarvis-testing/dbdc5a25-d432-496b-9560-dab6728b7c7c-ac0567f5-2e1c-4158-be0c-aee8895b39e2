
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
 // Define the component decorator with its metadata
@Component({ // The component's CSS element selector
  selector: 'app-root',// The location of the component's template file
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']// The location of the component's private CSS 
})
export class AppComponent implements OnInit {
  title:'angularapp';
  isLoggedIn = false;
  userRole: string | null = null;
 
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.userRole = localStorage.getItem('userRole');
        this.isLoggedIn = !!this.userRole;
      }
    });
  }
 
  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.isLoggedIn = !!this.userRole;
  }
}