import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoCitaService {
  private base = environment.apiBaseUrl + '/tipoCita';
  constructor(private http: HttpClient) {}

  getTiposCita(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }
}