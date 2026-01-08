import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginResponse } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loading = false;
  error = '';

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get correoCtrl() {
    return this.form.get('correo');
  }

  get passwordCtrl() {
    return this.form.get('password');
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.login(this.form.getRawValue()).subscribe({
      next: (response: LoginResponse) => {
        this.loading = false;
        this.auth.setUser(response);

        if (response.rol === 'PACIENTE') {
          this.router.navigateByUrl('/paciente/dashboard');
        } else if (response.rol === 'DOCTOR') {
          this.router.navigateByUrl('/doctor/dashboard');
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Correo o contraseña incorrectos.';
      }
    });
  }
}
