import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user.component.html',
})
export class UserComponent {
  users: any[] = [];
  email = '';
  password = '';
  isAuthenticated = false; // Track login state

  constructor(private userService: UserService) {}

  async authenticate() {
    const success = await this.userService.authenticateUser(this.email, this.password);
    if (success) {
      this.isAuthenticated = true; // Set authentication state
      sessionStorage.setItem('authenticatedEmail', this.email); // Store email
      alert(`Login successful! Welcome ${this.email}`);
    } else {
      alert('Login failed!');
    }
  }

  async fetchUsers() {
    this.users = await this.userService.getAllUsers();
  }
}
