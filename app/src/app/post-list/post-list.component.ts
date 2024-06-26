import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  filteredPosts: any[] = [];
  
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchPosts();
    this.fetchUsers();
  }

  fetchPosts() {
    this.apiService.getPosts().subscribe((posts: any[]) => {
      this.posts = posts;
      console.log(this.posts);
      this.posts.forEach(post => {
        post.userName = '';
      });
      this.assignUserNames();
      this.filteredPosts = this.posts; // Initialize filteredPosts with all posts
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

  navigateToPostDetails(postId: number) {
    console.log("inside navigate function")
    this.router.navigate(['/posts/', postId]);
  }

  filterPostsByUser(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const userId = selectElement.value;

    if (userId) {
      this.filteredPosts = this.posts.filter(post => post.userId === +userId);
    } else {
      this.filteredPosts = this.posts;
    }
  }

  sortPosts(order: string) {
    if (order === 'asc') {
      this.filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'desc') {
      this.filteredPosts.sort((a, b) => b.title.localeCompare(a.title));
    }
  }
}
