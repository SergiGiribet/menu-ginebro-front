import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from '../../environments/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${API_CONFIG.baseUrl}/orders`;
  private apiUrlByDate = `${API_CONFIG.baseUrl}/orders_by_date`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlByDate}/${date}`, {
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

  getByUser(userId: number): Observable<any> {
  return this.http.get<any>(`${API_CONFIG.baseUrl}/orders_by_user/${userId}`, {
    headers: this.getHeaders()
  }).pipe(catchError(this.handleError));
}

  private handleError(error: any) {
    console.error('OrdersService error:', error);
    return throwError(() => error);
  }
}
