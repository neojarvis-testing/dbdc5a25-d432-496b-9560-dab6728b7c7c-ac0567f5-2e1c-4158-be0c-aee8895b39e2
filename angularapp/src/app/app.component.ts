import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:'angularapp';
  userRole: string | null = null;

  ngOnInit(): void {
    // Check for the role in localStorage on application load
    this.userRole = localStorage.getItem('userRole');
  }

  // Update the role dynamically
  onRoleChange(newUserRole: string) {
    this.userRole = newUserRole;

    if (newUserRole) {
      localStorage.setItem('userRole', newUserRole); // Store the role
    } else {
      localStorage.removeItem('userRole'); // Clear the role if null
    }
  }
}
