import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/views/login/login.component';
import { UserListComponent } from './components/views/user-list/user-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'userList',
    component: UserListComponent,
    canActivate: [authGuard],
  },
];
