import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctoresService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.base}/doctor`);
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.base}/doctor/${id}`);
  }

  create(payload: Doctor): Observable<any> {
    return this.http.post(`${this.base}/doctor`, payload);
  }

  update(id: number, payload: Doctor): Observable<any> {
    return this.http.put(`${this.base}/doctor/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/doctor/${id}`);
  }
}