import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';


@Component({
  selector: 'app-user-add-blog',
  templateUrl: './user-add-blog.component.html',
  styleUrls: ['./user-add-blog.component.css']
})
export class UserAddBlogComponent {
  blogPost: BlogPost = {
    UserId: 0,
    Title: '',
    Content: '',
    Status: '',
    PublishedDate: new Date()
  };
  submitted = false;
  errorMessage = '';

  constructor(
    private blogService: BlogPostService,
    private router: Router
  ) {}

  onSubmit(form: any): void {
    this.submitted = true;
    this.errorMessage = '';

    if (form.invalid) {
      return;
    }

    const newBlog: BlogPost = {
      UserId: parseInt(localStorage.getItem('userId') || '0', 10),
      Title: this.blogPost.Title.trim(),
      Content: this.blogPost.Content.trim(),
      Status: 'Pending',
      PublishedDate: new Date()
    };

    // this.blogService.addBlogPost(newBlog).subscribe(()=>{
    //   console.log("Blog added")
    //   alert('Blog Post Added Successfully!');
    //   this.router.navigate(['/userviewblog']);
    // })
    this.blogService.addBlogPost(newBlog).subscribe({
      next: () => {
        alert('Blog Post Added Successfully!');
        this.router.navigate(['/userviewblog']);
      },
      error: (error) => {
        if (error.status === 400 || error.error === 'Blog with this title already exists') {
          this.errorMessage = 'A blog with the title already exists';
        } else {
          this.errorMessage = 'An error occurred while adding the blog post';
        }
      }
    });
  }
}