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

  constructor(private http: HttpClient) { }

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

  updateStatus(orderId: number, statusId: number): Observable<any> {
    return this.http.post(
      `${API_CONFIG.baseUrl}/orders/updateStatus/${orderId}`,
      { order_status_id: statusId },
      { headers: this.getHeaders() }
    ).pipe(catchError(this.handleError));
  }

  export(format: string): Observable<any> {
    const headers = this.getHeaders();
    const options = {
      headers,
      responseType: 'blob' as 'json',
      observe: 'response' as 'body'
    };
  
    return this.http.get(`${this.apiUrl}/export?format=${format}`, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(() => error);
  }
}
