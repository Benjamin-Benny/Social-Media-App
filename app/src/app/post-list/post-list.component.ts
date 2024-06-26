import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchPosts();
    this.fetchUsers();
  }

  fetchPosts() {
    this.apiService.getPosts().subscribe((posts: any[]) => {
      this.posts = posts;
      this.posts.forEach(post => {
        post.userName = '';
      });
      this.assignUserNames();
    });
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe((users: any[]) => {
      this.users = users;
      this.assignUserNames();
    });
  }

  assignUserNames() {
    if (this.posts.length && this.users.length) {
      this.posts.forEach(post => {
        const user = this.users.find(u => u.id === post.userId);
        if (user) {
          post.userName = user.name;
        }
      });
    }
  }
}
