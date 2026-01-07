import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Paciente } from '../models/paciente.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PacientesService {
  private base = environment.apiBaseUrl + '/paciente';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.base);
  }

  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.base}/${id}`);
  }

  create(payload: Paciente): Observable<any> {
    return this.http.post(this.base, payload);
  }

  update(id: number, payload: Paciente): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}