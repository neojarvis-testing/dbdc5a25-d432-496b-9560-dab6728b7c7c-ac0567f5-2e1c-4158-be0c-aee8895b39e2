import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-user-view-blog',
  templateUrl: './user-view-blog.component.html',
  styleUrls: ['./user-view-blog.component.css']
})
export class UserViewBlogComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  showDeleteConfirm: boolean = false;
  blogToDelete: number | null = null;

  constructor(private blogService: BlogPostService, private router: Router) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {

    this.blogService.getAllBlogPosts().subscribe(data=>{
      this.blogPosts = data;
    });
    // this.blogService.getAllBlogPosts().subscribe({
    //   next: (data) => {
    //     console.log("Fetched Blog Posts:", data);
    //     this.blogPosts = data;
    //   },
    //   error: (err) => {
    //     console.error('Error loading blog posts:', err);
    //   }
    // });
  }

  confirmDelete(blogId: number): void {
    this.blogToDelete = blogId;
    this.showDeleteConfirm = true;
  }

  deleteConfirmed(): void {
    if (this.blogToDelete !== null) {
      this.blogService.deleteBlogPost(this.blogToDelete).subscribe({
        next: () => {
          this.showDeleteConfirm = false;
          this.blogToDelete = null;
          this.loadBlogPosts();
        },
        error: (err) => {
          console.error('Error deleting blog post:', err);
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.blogToDelete = null;
  }

  editBlog(blogId: number): void {
    this.router.navigate(['/useraddblog'], { queryParams: { id: blogId } });
  }
}
