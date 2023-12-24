import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';


export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'userList',
    component: UserListComponent
  }
];
