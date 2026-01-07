import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.model';

@Injectable({ providedIn: 'root' })
export class RecetasService {
  private base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.base}/doctor/recetas`);
  }

  create(payload: Receta): Observable<any> {
    return this.http.post(`${this.base}/doctor/recetas`, payload);
  }

  getById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.base}/doctor/recetas/${id}`);
  }

  update(id: number, payload: Receta): Observable<any> {
    return this.http.put(`${this.base}/doctor/recetas/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/doctor/recetas/${id}`);
  }
}