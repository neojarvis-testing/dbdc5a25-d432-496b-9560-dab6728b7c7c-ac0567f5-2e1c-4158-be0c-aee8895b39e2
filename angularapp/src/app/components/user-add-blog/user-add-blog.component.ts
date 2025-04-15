import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add-blog',
  templateUrl: './user-add-blog.component.html',
  styleUrls: ['./user-add-blog.component.css']
})
export class UserAddBlogComponent implements OnInit {
  // blogForm!: FormGroup;
  // errorMessage: string = '';
  // isEdit: boolean = false; // Toggle for add/edit mode

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  
    // this.blogForm = this.fb.group({
    //   title: ['', Validators.required],
    //   content: ['', Validators.required]
    // });
    // Pre-populate form if editing (using route data)
  }

  // onSubmit() {
  //   if (this.blogForm.invalid) {
  //     this.errorMessage = 'All fields are required';
  //     return;
  //   }
  //   // Simulate checking for duplicate title
  //   const duplicateTitle = false;
  //   if (duplicateTitle) {
  //     this.errorMessage = 'A blog with the title already exists';
  //     return;
  //   }
  //   alert(this.isEdit ? 'Blog Updated Successfully!' : 'Blog Post Added Successfully!');
  //   this.router.navigate(['/user/view-blog']);
  // }
}