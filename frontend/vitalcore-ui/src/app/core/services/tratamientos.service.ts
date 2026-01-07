import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Tratamiento } from '../models/tratamiento.model';

@Injectable({ providedIn: 'root' })
export class TratamientosService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.base}/tratamiento`);
  }

  getById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.base}/tratamiento/${id}`);
  }

  create(payload: Tratamiento): Observable<any> {
    return this.http.post(`${this.base}/tratamiento`, payload);
  }

  update(id: number, payload: Tratamiento): Observable<any> {
    return this.http.put(`${this.base}/tratamiento/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/tratamiento/${id}`);
  }
}