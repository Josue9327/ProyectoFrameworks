import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.model';

@Injectable({ providedIn: 'root' })
export class RecetasService {
    private base = environment.apiBaseUrl; // /api

    constructor(private http: HttpClient) { }

    getAll(): Observable<Receta[]> {
        return this.http.get<Receta[]>(`${this.base}/receta`);
    }
}
