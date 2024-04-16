import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Update the path to AuthService

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSurveys(): Observable<any> {
    const url = `${this.apiUrl}/surveys`;
    return this.http.get(url);
  }

  postSurvey(surveyData: any): Observable<any> {
    const url = `${this.apiUrl}/surveys`;

    // Get the token from AuthService
    const token = this.authService.getToken();

    // Set the request headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(url, surveyData, { headers: headers }).pipe(
      catchError((error) => {
        console.error('Error posting survey:', error);
        throw error;
      })
    );
  }
}
