import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.base}/doctor/citas`);
  }

  create(payload: Cita): Observable<any> {
    return this.http.post(`${this.base}/doctor/citas`, payload);
  }

  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.base}/doctor/citas/${id}`);
  }

  update(id: number, payload: Cita): Observable<any> {
    return this.http.put(`${this.base}/doctor/citas/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/doctor/citas/${id}`);
  }

  getTiposCita(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/tipos-cita`);
  }
}