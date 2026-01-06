import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HistorialMedico } from '../models/historial-medico.model';

@Injectable({ providedIn: 'root' })
export class HistorialMedicoService {
    private base = environment.apiBaseUrl; // /api

    constructor(private http: HttpClient) { }

    getAll(): Observable<HistorialMedico[]> {
        return this.http.get<HistorialMedico[]>(`${this.base}/historialMedico`);
    }
}
