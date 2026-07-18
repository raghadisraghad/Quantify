import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface BusinessLoginResponse {
  token: string;
  businessId: string;
  email: string;
  businessName: string;
  type: string;
}

export interface UserLoginResponse {
  token: string;
  userId: string;
  businessId: string;
  userName: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  login(email: string, password: string): Observable<BusinessLoginResponse> {
    return this.http.post<BusinessLoginResponse>(`${this.base}/businesses/login`, { email, password });
  }

  verifyPin(businessId: string, pin: string): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.base}/users/login`, { businessId, pin });
  }
}
