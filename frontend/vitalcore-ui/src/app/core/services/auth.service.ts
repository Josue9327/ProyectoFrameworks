import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export type RoleType = 'PACIENTE' | 'DOCTOR';

export type RegisterRequest = {
  rol: RoleType;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  password: string;
  telefono: string;
  direccion?: string;
  especialidad?: string;
  fechaNacimiento?: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;
  private USER_KEY = 'vitalcore_user';

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest) {
    const body = {
      nombre: payload.nombre,
      appat: payload.apellidoPaterno,
      apmat: payload.apellidoMaterno,
      correo: payload.correo,
      password: payload.password,
      telefono: payload.telefono,
      direccion: payload.direccion,
      especialidad: payload.especialidad,
      fechaNacimiento: payload.rol === 'PACIENTE' ? payload.fechaNacimiento : null
    };

    const url =
      payload.rol === 'DOCTOR'
        ? `${this.base}/doctor`
        : `${this.base}/paciente`;

    return this.http.post(url, body);
  }

  login(payload: { correo: string; password: string }) {
    return new Observable(observer => {
      this.http.get<any[]>(`${this.base}/paciente`).subscribe({
        next: (pacientes) => {
          const foundP = pacientes.find(p => p.correo === payload.correo);
          if (foundP) {
            observer.next({ ...foundP, rol: 'PACIENTE' });
            observer.complete();
            return;
          }

          this.http.get<any[]>(`${this.base}/doctor`).subscribe({
            next: (doctores) => {
              const foundD = doctores.find(d => d.correo === payload.correo);
              if (foundD) {
                observer.next({ ...foundD, rol: 'DOCTOR' });
                observer.complete();
              } else {
                observer.error({ status: 401, message: 'Usuario no encontrado' });
              }
            },
            error: (e) => observer.error(e)
          });
        },
        error: (e) => observer.error(e)
      });
    });
  }

  setUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any | null {
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? JSON.parse(stored) : null;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
