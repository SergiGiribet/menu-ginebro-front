import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Student } from '../../interfaces/student';
import { API_CONFIG } from '../../environments/api.config';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private localStorageKey = 'user';
  private baseUrl = `${API_CONFIG.baseUrl}/users`;
  private cachedStudent: Student | null = null;

  constructor(private http: HttpClient) {}

  getStudentById(id: number): Observable<Student> {
    if (this.cachedStudent) {
      return of(this.cachedStudent);
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<{ status: number; data: Student }>(`${this.baseUrl}/${id}`, {
        headers,
      })
      .pipe(
        map((response) => {
          const user = response.data;
          this.saveStudent(user);
          return user;
        })
      );
  }

  getLocalStudent(): Student | null {
    if (this.cachedStudent) return this.cachedStudent;

    const userJson = localStorage.getItem(this.localStorageKey);
    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        this.cachedStudent = parsed;
        return parsed;
      } catch {
        return null;
      }
    }

    return null;
  }

  saveStudent(user: Student): void {
    this.cachedStudent = user;
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  clearStudent(): void {
    this.cachedStudent = null;
    localStorage.removeItem(this.localStorageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getLocalStudent();
  }

  getStudentId(): number | null {
    return this.getLocalStudent()?.id ?? null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }
}
