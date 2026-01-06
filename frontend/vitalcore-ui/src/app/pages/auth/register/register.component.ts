import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RoleType } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.scss'
})
export class RegisterComponent {
  loading = false;
  error = '';

  roles: { label: string; value: RoleType }[] = [
    { label: 'Paciente', value: 'PACIENTE' },
    { label: 'Doctor', value: 'DOCTOR' }
  ];

  form!: FormGroup; // 👈 se declara, no se inicializa aquí

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // 👇 aquí YA existe fb
    this.form = this.fb.group({
      rol: ['PACIENTE' as RoleType, [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.register(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/login');
      },
      error: (e) => {
        this.loading = false;
        this.error = 'No se pudo registrar. Revisa si el backend exige campos extra.';
        console.error(e);
      }
    });
  }
}