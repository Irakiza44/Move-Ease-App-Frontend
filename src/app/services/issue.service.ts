import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private apiUrl = 'http://localhost:5000/api/issues';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return this.authService.setHeaders();
  }

  reportIssue(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error reporting issue:', error);
        return throwError(error);
      })
    );
  }

  getIssues(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching issues:', error);
        return throwError(error);
      })
    );
  }
}
