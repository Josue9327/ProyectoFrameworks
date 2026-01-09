import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  private base = environment.apiBaseUrl + '/enviarPDFCorreo';
  constructor(private http: HttpClient) {}

  enviarPDFCorreo(correo: string): Observable<string> {
    return this.http.get(
      `${this.base}/${encodeURIComponent(correo)}`,
      { responseType: 'text' }
    );
  }
}
