import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5104/api/users';

  login(request: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, request);
  }
}
