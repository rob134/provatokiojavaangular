import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return new HttpHeaders({
      'Authorization': `Bearer ${currentUser.token || ''}`
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true
    });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials, {
      withCredentials: true
    });
  }

  register(user: Omit<User, 'id'>): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user, {
      withCredentials: true
    });
  }
}
