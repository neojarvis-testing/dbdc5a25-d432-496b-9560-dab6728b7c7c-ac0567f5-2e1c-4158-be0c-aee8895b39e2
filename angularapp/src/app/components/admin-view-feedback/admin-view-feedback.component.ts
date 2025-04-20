import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  showProfileModal: boolean = false;
  errorMessage: string = '';
  Username: string = '';

  columnDefs = [
    { headerName: 'S.No', valueGetter: 'node.rowIndex + 1', width: 100 },
    { headerName: 'User Name', field: 'User.Username', width: 150 },
    { headerName: 'Feedback', field: 'FeedbackText', width: 300 },
    { headerName: 'Posted Date', field: 'Date', cellRenderer: (params: any) => new Date(params.value).toLocaleDateString(), width: 200 },
    {
      headerName: 'Action',
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onShowProfile.bind(this),
        label: 'Show Profile'
      },
      width: 150
    }
  ];

  frameworkComponents: any;
  rowData: any[] = [];

  constructor(private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeedbacks();
    this.Username = localStorage.getItem('userName') || '';
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
        this.rowData = data;
        if (this.feedbacks.length === 0) {
          this.errorMessage = 'No data found';
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load feedbacks.';
      }
    );
  }

  onShowProfile(params: any): void {
    this.selectedFeedback = params.data;
    this.showProfileModal = true;
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
    this.selectedFeedback = null;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}





// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { Feedback } from 'src/app/models/feedback.model';
 
// @Component({
//   selector: 'app-admin-view-feedback',
//   templateUrl: './admin-view-feedback.component.html',
//   styleUrls: ['./admin-view-feedback.component.css']
// })
// export class AdminViewFeedbackComponent implements OnInit {
//   feedbacks: Feedback[] = [];
//   feedbackUsernames: { [key: number]: string } = {};
//   selectedFeedback: Feedback | null = null;
//   showProfileModal: boolean = false;
//   showLogoutModal: boolean = false;
//   errorMessage: string = '';
//   Username: string = '';
 
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
 
//   constructor(private feedbackService: FeedbackService, private router: Router) { }
 
//   ngOnInit(): void {
//     this.loadFeedbacks();
//     this.Username = localStorage.getItem('userName') || '';
//   }
 
//   loadFeedbacks(): void {
//     this.feedbackService.getFeedbacks().subscribe(
//       (data) => {
//         this.feedbacks = data;
//         if (this.feedbacks.length === 0) {
//           this.errorMessage = 'No data found';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'Failed to load feedbacks.';
//       }
//     );
//   }
 
//   showProfile(feedback: Feedback): void {
//     this.selectedFeedback = feedback;
//     this.showProfileModal = true;
//   }
 
//   closeProfileModal(): void {
//     this.showProfileModal = false;
//     this.selectedFeedback = null;
//   }
 
//   closeLogoutModal(): void {
//     this.showLogoutModal = false;
//   }
 
//   logout(): void {
//     this.router.navigate(['/login']);
//   }
 
//   // Pagination methods
//   get paginatedFeedbacks(): Feedback[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.feedbacks.slice(startIndex, startIndex + this.itemsPerPage);
//   }
 
//   nextPage(): void {
//     if (this.currentPage * this.itemsPerPage < this.feedbacks.length) {
//       this.currentPage++;
//     }
//   }
 
//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }
 
//   getTotalPages(): number {
//     return Math.ceil(this.feedbacks.length / this.itemsPerPage);
//   }
// }
