import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortPipe } from './../../../pipes/sort.pipe';
declare var $: any;

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIconModule,
    DragDropModule,
    MatCheckboxModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    SortPipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [UsersService],
})
export class UserListComponent {
  users: any[];
  selectedUserIds: number[] = [];

  sortedColumn: string = '';
  sortDirection: number = 1;

  deleteAll: boolean;
  isDisabled: boolean = true;
  userId: any;
  toastMessage: boolean = true;

  selectedRow: any;
  hoveredRow: any;

  moveDirection: 'up' | 'down' = 'up';

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.users.map((user) => (user.checked = false));
      this.toastMessage = true;
      $(document).ready(function () {
        $('#liveToast').toast('show');
      });
      this.isSelect();
    });
  }

  sortTable(column: string): void {
    if (this.sortedColumn === column) {
      this.sortDirection = -this.sortDirection;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  }

  openDeleteModal(deleteAction: boolean, userId?): void {
    this.deleteAll = deleteAction;
    if (userId) this.userId = userId;
    $('#deleteModal').modal('show');
  }

  isDelete(): void {
    $('#deleteModal').modal('hide');
    this.toastMessage = false;
    $(document).ready(function () {
      $('#liveToast').toast('show');
    });
    this.deleteAll ? this.deleteSelectedUsers() : this.deleteUser(this.userId);
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  deleteSelectedUsers(): void {
    this.users = this.users.filter((user) => {
      return !user.checked;
    });
  }

  isSelect(): void {
    this.isDisabled = this.users.every((obj) => !obj.checked);
  }

  selectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.users.forEach((user) => {
      if (isChecked) {
        user.checked = true;
      } else {
        user.checked = false;
      }
    });
  }

  onRowSelect(user: any): void {
    this.selectedRow = user;
  }

  onRowHover(isHovered: boolean, user: any): void {
    if (isHovered) {
      this.hoveredRow = user;
    } else {
      this.hoveredRow = null;
    }
  }

  isButtonVisible(user: any): boolean {
    return this.hoveredRow === user || this.isSelected(user);
  }

  isSelected(user: any): boolean {
    return this.selectedRow === user;
  }

  reorder(user: any): void {
    const currentIndex = this.users.indexOf(user);

    const selectedRowIndex = this.users.indexOf(this.selectedRow);
    const moveDirection = currentIndex > selectedRowIndex ? 'down' : 'up';

    if (moveDirection === 'up' && currentIndex > 0) {
      [this.users[currentIndex], this.users[currentIndex - 1]] = [
        this.users[currentIndex - 1],
        this.users[currentIndex],
      ];
    } else if (
      moveDirection === 'down' &&
      currentIndex < this.users.length - 1
    ) {
      [this.users[currentIndex], this.users[currentIndex + 1]] = [
        this.users[currentIndex + 1],
        this.users[currentIndex],
      ];
    }
  }
}
