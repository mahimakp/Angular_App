import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    HeaderComponent,
    MatTableModule,
    MatIconModule,
    DragDropModule,
    MatCheckboxModule,
    MatCardModule,
    MatSortModule,
    HttpClientModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [UsersService],
})
export class UserListComponent {
  users: User[];
  selectedUserIds: number[] = [];
  // dataSource: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['select', 'name', 'phone', 'email', 'delete'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  selectAllRows(checkbox): void {
    this.selectedUserIds = [];

    if (checkbox.checked) {
      this.selectedUserIds = this.users.map((user) => user.id);
    }
  }

  onCheckboxChange(user: User): void {
    const index = this.selectedUserIds.indexOf(user.id);

    if (index === -1) {
      this.selectedUserIds.push(user.id);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    this.dataSource = new MatTableDataSource(this.users);
  }

  deleteSelectedUsers(): void {
    this.selectedUserIds.forEach((userId) => this.deleteUser(userId));
    this.selectedUserIds = [];
    this.dataSource = new MatTableDataSource(this.users);
  }

  drop(event: CdkDragDrop<User[]>): void {
    moveItemInArray(
      this.dataSource.data,
      event.previousIndex,
      event.currentIndex
    );
    this.dataSource.data = [...this.dataSource.data];
  }
}

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
}
