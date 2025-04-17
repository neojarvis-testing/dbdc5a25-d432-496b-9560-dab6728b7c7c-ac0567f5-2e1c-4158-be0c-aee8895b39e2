import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogPostService } from 'src/app/services/blog-post.service';

@Component({
  selector: 'app-admin-view-blog',
  templateUrl: './admin-view-blog.component.html',
  styleUrls: ['./admin-view-blog.component.css']
})
export class AdminViewBlogComponent implements OnInit {

  blogPosts: BlogPost[] = [];

  constructor(private blogService: BlogPostService) {}

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {

    this.blogService.getAllBlogPosts().subscribe(data=>{
      this.blogPosts = data;
    });
    
  }


  statusApproved(blog: BlogPost): void {
    blog.Status = "Approved";
    this.blogService.updateBlogPost(blog.BlogPostId, blog).subscribe();
  }

  statusRejected(blog: BlogPost): void {
    blog.Status = "Rejected";
    this.blogService.updateBlogPost(blog.BlogPostId, blog).subscribe();
  }

}
//done
