import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctoresService {
  private base = environment.apiBaseUrl + '/doctor';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.base);
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.base}/${id}`);
  }

  create(payload: Doctor): Observable<any> {
    return this.http.post(this.base, payload);
  }

  update(id: number, payload: Doctor): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}