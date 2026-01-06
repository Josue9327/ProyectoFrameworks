import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitasService {
    private base = environment.apiBaseUrl; // /api

    constructor(private http: HttpClient) { }

    getAll(): Observable<Cita[]> {
        return this.http.get<Cita[]>(`${this.base}/cita`);
    }
}
