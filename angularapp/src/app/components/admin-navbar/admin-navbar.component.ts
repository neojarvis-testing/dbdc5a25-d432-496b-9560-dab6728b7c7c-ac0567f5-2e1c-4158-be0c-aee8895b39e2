import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  title = 'BlogPortal';
  constructor(private router: Router) { }



  ngOnInit(): void {
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}

