import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  error = '';
  roles = [
    { value: 'PACIENTE', label: 'Paciente' },
    { value: 'DOCTOR', label: 'Doctor' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      rol: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.invalid) return;

    const { rol, nombre, apellidoPaterno, apellidoMaterno, correo, password } = this.form.value;
    const registerPayload = {
      rol,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      password
    };

    this.loading = true;
    this.authService.register(registerPayload).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error en el registro';
      }
    });
  }
}