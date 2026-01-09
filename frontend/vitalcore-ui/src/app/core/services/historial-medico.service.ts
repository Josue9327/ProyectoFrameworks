import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HistorialMedico } from '../models/historial-medico.model';

@Injectable({
  providedIn: 'root'
})
export class HistorialMedicoService {

  private base = environment.apiBaseUrl + '/historialMedico';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HistorialMedico[]> {
    return this.http.get<HistorialMedico[]>(this.base);
  }

  getById(id: number): Observable<HistorialMedico> {
    return this.http.get<HistorialMedico>(`${this.base}/${id}`);
  }

  create(payload: HistorialMedico): Observable<HistorialMedico> {
    return this.http.post<HistorialMedico>(this.base, payload);
  }

  update(id: number, payload: HistorialMedico): Observable<HistorialMedico> {
    return this.http.put<HistorialMedico>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
