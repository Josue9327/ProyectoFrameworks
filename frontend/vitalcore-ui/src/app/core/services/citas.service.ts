import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private base = environment.apiBaseUrl + '/cita';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.base);
  }

  create(payload: Cita): Observable<any> {
    return this.http.post(this.base, payload);
  }

  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.base}/${id}`);
  }

  update(id: number, payload: Cita): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  getTiposCita(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/tipoCita`);
  }
}