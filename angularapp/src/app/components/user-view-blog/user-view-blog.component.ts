
import { Component, OnInit } from '@angular/core';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-user-view-blog',
  templateUrl: './user-view-blog.component.html',
  styleUrls: ['./user-view-blog.component.css']
})
export class UserViewBlogComponent implements OnInit {

  blogPosts: any[] = [];

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    this.fetchBlogPosts();
  }

  fetchBlogPosts(): void {
    this.blogPostService.getAllBlogPosts().subscribe(
      (data) => {
        this.blogPosts = data;
      },
      (error) => {
        console.error('Error fetching blog posts:', error);
      }
    );
  }

  deleteBlogPost(postId: number): void {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogPostService.deleteBlogPost(postId).subscribe(
        () => {
          this.blogPosts = this.blogPosts.filter(post => post.id !== postId);
          alert('Blog post deleted successfully!');
        },
        (error) => {
          console.error('Error deleting blog post:', error);
        }
      );
    }
  }
}
