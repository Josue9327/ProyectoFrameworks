import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

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
  private USER_KEY = 'vitalcore_user';

  constructor(private http: HttpClient) { }

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
    // Backend doesn't have auth/login. We simulate it by finding the user by email.
    // 1. Try to find in Pacientes
    return new Observable(observer => {
      this.http.get<any[]>(`${this.base}/paciente`).subscribe({
        next: (pacientes) => {
          const foundP = pacientes.find(p => p.correo === payload.correo);
          if (foundP) {
            observer.next({ ...foundP, rol: 'PACIENTE' });
            observer.complete();
            return;
          }

          // 2. If not found, try Doctors
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

  // Session Management
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
