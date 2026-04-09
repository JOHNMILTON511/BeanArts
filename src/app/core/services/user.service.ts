import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile, Address } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/users`;

  getProfile(uid: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.api}/${uid}`);
  }

  updateProfile(uid: string, data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${this.api}/${uid}`, data);
  }

  addAddress(uid: string, address: Address): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.api}/${uid}/addresses`, address);
  }

  removeAddress(uid: string, addressId: string): Observable<UserProfile> {
    return this.http.delete<UserProfile>(`${this.api}/${uid}/addresses/${addressId}`);
  }
}
