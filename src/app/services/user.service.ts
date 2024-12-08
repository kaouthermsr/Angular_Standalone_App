import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  async authenticateUser(email: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/authenticate`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Authentication failed', error);
      return false;
    }
  }

  async createUser(user: any): Promise<any> {
    return axios.post(`${this.baseUrl}/createUser`, user);
  }

  async getAllUsers(): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/readAllUsers`);
    return response.data;
  }
}
