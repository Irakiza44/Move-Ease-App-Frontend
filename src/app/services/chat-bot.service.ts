import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  sendMessage(message: string): Observable<any> {
    const url = `${this.apiUrl}/chat/send`;

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = { message };

    return this.http.post(url, body, { headers: headers }).pipe(
      catchError((error) => {
        console.error('Error sending message:', error);
        throw error;
      })
    );
  }
}
