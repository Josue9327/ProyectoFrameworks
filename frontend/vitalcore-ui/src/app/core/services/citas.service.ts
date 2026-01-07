import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';
import { TipoCita } from '../models/tipo-cita.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private base = environment.apiBaseUrl + '/cita';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.base);
  }

  create(payload: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.base, payload);
  }

  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.base}/${id}`);
  }

  update(id: number, payload: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.base}/${id}`, payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getTiposCita(): Observable<TipoCita[]> {
    return this.http.get<TipoCita[]>(`${this.base}/tipoCita`);
  }
}
