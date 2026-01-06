import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type RoleType = 'PACIENTE' | 'DOCTOR';

export type RegisterRequest = {
  rol: RoleType;
  nombre: string;
  apellidos: string;
  correo: string;
  password: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest) {
    const body = {
      nombre: payload.nombre,
      apPat: payload.apellidos,
      correo: payload.correo,
      password: payload.password
    };

    const url =
      payload.rol === 'DOCTOR'
        ? `${this.base}/doctor`
        : `${this.base}/paciente`;

    return this.http.post(url, body);
  }

  login(payload: { correo: string; password: string }) {
    return this.http.post(`${this.base}/auth/login`, payload);
  }
}