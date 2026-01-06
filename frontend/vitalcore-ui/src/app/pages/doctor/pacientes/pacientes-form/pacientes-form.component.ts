import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { Paciente } from '../../../../core/models/paciente.model';

@Component({
  selector: 'app-pacientes-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './pacientes-form.component.html',
  styleUrl: './pacientes-form.component.scss'
})
export class PacientesFormComponent implements OnInit {
  loading = false;
  error = '';
  isEdit = false;
  id: number | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pacientes: PacientesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      appat: ['', [Validators.required]], // Backend requires this
      apmat: ['', [Validators.required]], // Backend requires this
      correo: ['', [Validators.email]],
      telefono: ['', [Validators.required]], // Backend likely requires this
      fechaNacimiento: ['', [Validators.required]], // Backend requires this
      direccion: ['', [Validators.required]] // Backend requires this
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.loading = true;
      this.pacientes.getById(this.id).subscribe({
        next: (p) => {
          this.form.patchValue({
            nombre: p.nombre ?? '',
            appat: p.appat ?? '',
            apmat: p.apmat ?? '',
            correo: p.correo ?? '',
            telefono: p.telefono ?? '',
            fechaNacimiento: p.fechaNacimiento ? p.fechaNacimiento.split('T')[0] : '', // Format for date input
            direccion: p.direccion ?? ''
          });
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
          this.error = 'No se pudo cargar para editar.';
          this.loading = false;
        }
      });
    }
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Paciente = this.form.getRawValue();
    this.loading = true;

    const req = this.isEdit && this.id
      ? this.pacientes.update(this.id, payload)
      : this.pacientes.create(payload);

    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/doctor/pacientes');
      },
      error: (e) => {
        console.error(e);
        this.error = 'No se pudo guardar. (Revisa campos requeridos en el backend)';
        this.loading = false;
      }
    });
  }
}
