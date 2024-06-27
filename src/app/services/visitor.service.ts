import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private apiUrl = 'http://localhost:5000/api/visitors';

  constructor(private http: HttpClient, private authService: AuthService) {}

  reportVisitor(data: any): Observable<any> {
    const headers = this.authService.setHeaders();
    return this.http.post(this.apiUrl, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error reporting visitor:', error);
        return throwError(error);
      })
    );
  }

  getVisitors(): Observable<any> {
    const headers = this.authService.setHeaders();
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching visitors:', error);
        return throwError(error);
      })
    );
  }
}
