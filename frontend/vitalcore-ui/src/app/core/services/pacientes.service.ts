import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Paciente } from '../models/paciente.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PacientesService {
  private base = environment.apiBaseUrl; // https://.../api :contentReference[oaicite:2]{index=2}

  constructor(private http: HttpClient) { }

  // GET /paciente  :contentReference[oaicite:3]{index=3}
  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.base}/paciente`);
  }

  // GET /paciente/{id}
  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.base}/paciente/${id}`);
  }

  // POST /paciente
  create(payload: Paciente): Observable<any> {
    return this.http.post(`${this.base}/paciente`, payload);
  }

  // PUT /paciente/{id}
  update(id: number, payload: Paciente): Observable<any> {
    return this.http.put(`${this.base}/paciente/${id}`, payload);
  }

  // DELETE /paciente/{id}
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.base}/paciente/${id}`);
  }
}
