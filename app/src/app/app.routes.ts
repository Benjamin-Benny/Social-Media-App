import { Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';

const routes: Routes = [
    { path: '', redirectTo: 'posts', pathMatch: 'full' },
    { path: 'posts', component: PostListComponent },
    { path: 'posts/:id', component: PostDetailsComponent },
    { path: '**', redirectTo: 'posts' }
  ];

  export {routes};