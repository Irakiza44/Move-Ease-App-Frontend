import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Login
  login(data: any): Observable<any> {
    const url = `${this.apiUrl}/users/login`;
    return this.http.post(url, data).pipe(
      catchError((error) => {
        return throwError(error);
      }),
      tap((response: any) => {
        if (response.accessToken) {
          this.storeToken(response.accessToken);
        }
      })
    );
  }

  // Store token in local storage
  storeToken(token: string): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Retrieve token from local storage
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  // Set token in HTTP headers
  setHeaders(): HttpHeaders {
    const token = this.getToken();

    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  // Registering in cell
  register(data: any): Observable<any> {
    const url = `${this.apiUrl}/contacts`;

    // Retrieve stored token from local storage
    const storedToken = this.getToken();

    // Set headers with token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${storedToken}`, // Include the stored token
    });

    return this.http.post(url, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error during registration:', error);
        throw error;
      })
    );
  }

  // Signup
  signup(data: any): Observable<any> {
    const url = `${this.apiUrl}/users/Register`;
    return this.http.post(url, data).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        throw error;
      })
    );
  }

  // Delete a contact
  deleteContact(id: string): Observable<any> {
    const url = `${this.apiUrl}/contacts/${id}`;

    // Set headers with token
    const headers = this.setHeaders();

    return this.http.delete(url, { headers }).pipe(
      catchError((error) => {
        console.error('Error during deletion:', error);
        throw error;
      })
    );
  }
}
