import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<any> {
    const url = `${this.apiUrl}/surveys`;
    return this.http.get(url);
  }

  postSurvey(surveyData: any): Observable<any> {
    const url = `${this.apiUrl}/surveys`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, surveyData, { headers: headers }).pipe(
      catchError((error) => {
        console.error('Error posting survey:', error);
        throw error;
      })
    );
  }

  postContactUs(contactData: any): Observable<any> {
    const url = `${this.apiUrl}/contact-us`;
    return this.http.post(url, contactData);
  }
}
