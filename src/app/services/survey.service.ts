import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
