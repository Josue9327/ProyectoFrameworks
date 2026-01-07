import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      rol: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: [''],
      especialidad: [''],
      fechaNacimiento: ['']
    });
  }

  ngOnInit(): void {}

  onRoleChange(event: any): void {
    const role = event.target.value;
    if (role === 'PACIENTE') {
      this.form.get('direccion')?.setValidators([Validators.required]);
      this.form.get('telefono')?.setValidators([Validators.required]);
      this.form.get('especialidad')?.clearValidators();
    } else if (role === 'DOCTOR') {
      this.form.get('especialidad')?.setValidators([Validators.required]);
      this.form.get('telefono')?.setValidators([Validators.required]);
      this.form.get('direccion')?.clearValidators();
    }
    this.form.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid) return;

    const { rol, nombre, apellidoPaterno, apellidoMaterno, correo, password, telefono, direccion, especialidad, fechaNacimiento } = this.form.value;

    const registerPayload = {
      rol,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      password,
      telefono,
      direccion: rol === 'PACIENTE' ? direccion : null,
      especialidad: rol === 'DOCTOR' ? especialidad : null,
      fechaNacimiento: rol === 'PACIENTE' ? fechaNacimiento : null
    };

    this.loading = true;
    this.authService.register(registerPayload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Error en el registro';
      }
    });
  }
}
