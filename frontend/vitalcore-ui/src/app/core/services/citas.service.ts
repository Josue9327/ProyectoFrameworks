import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cita } from '../models/cita.model';
import { TipoCita } from '../models/tipo-cita.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private base = environment.apiBaseUrl + '/cita';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.base).pipe(
      catchError(this.handleError)
    );
  }

  create(payload: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.base, payload).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.base}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, payload: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.base}/${id}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getTiposCita(): Observable<TipoCita[]> {
    return this.http.get<TipoCita[]>(`${this.base}/tipoCita`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
