import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Tratamiento } from '../models/tratamiento.model';

@Injectable({ providedIn: 'root' })
export class TratamientosService {
  private base = environment.apiBaseUrl + '/tratamiento';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(this.base);
  }

  getById(id: number): Observable<Tratamiento> {
    return this.http.get<Tratamiento>(`${this.base}/${id}`);
  }

  create(payload: Tratamiento): Observable<any> {
    return this.http.post(this.base, payload);
  }

  update(id: number, payload: Tratamiento): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}