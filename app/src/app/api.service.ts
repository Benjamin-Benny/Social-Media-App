import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${userId}`);
  }

  getPostComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}/comments`);
  }
}
