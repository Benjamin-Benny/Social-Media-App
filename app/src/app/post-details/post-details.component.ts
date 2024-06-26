import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  post: any = {};
  user: any = {};
  comments: any[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const postIdParam = this.route.snapshot.paramMap.get('id');
    if (postIdParam) {
      const postId = +postIdParam;
      if (!isNaN(postId)) {
        this.fetchPost(postId);
        this.fetchComments(postId);
      } else {
        // Handle the case where postId is not a valid number
        console.error('Invalid post ID');
      }
    } else {
      // Handle the case where postIdParam is null or undefined
      console.error('Post ID not found in route parameters');
    }
  }

  fetchPost(postId: number) {
    this.apiService.getPosts().subscribe(posts => {
      this.post = posts.find(post => post.id === postId);
      if (this.post) {
        this.fetchUser(this.post.userId);
      } else {
        console.error('Post not found');
      }
    });
  }

  fetchUser(userId: number) {
    this.apiService.getUserById(userId).subscribe(user => {
      this.user = user;
    });
  }

  fetchComments(postId: number) {
    this.apiService.getPostComments(postId).subscribe(comments => {
      this.comments = comments;
    });
  }
}
