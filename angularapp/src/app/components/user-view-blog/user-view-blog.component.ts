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
  userID = localStorage.getItem('userId');
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private blogService: BlogPostService, private router: Router) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogService.getAllBlogPosts().subscribe(data => {
      this.blogPosts = data;
    });
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

  get paginatedBlogPosts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.blogPosts.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.blogPosts.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
