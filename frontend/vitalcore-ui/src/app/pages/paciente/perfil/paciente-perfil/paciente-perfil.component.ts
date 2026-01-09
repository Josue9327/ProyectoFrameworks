import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { HistorialMedicoService } from '../../../../core/services/historial-medico.service';
import { Paciente } from '../../../../core/models/paciente.model';
import { HistorialMedico } from '../../../../core/models/historial-medico.model';

@Component({
  selector: 'app-paciente-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paciente-perfil.component.html',
  styleUrl: './paciente-perfil.component.scss'
})
export class PacientePerfilComponent implements OnInit {
  loading = true;
  saving = false;
  error = '';
  success = '';
  historialForm!: FormGroup;
  historialSaving = false;
  historialError = '';
  historialSuccess = '';

  form!: FormGroup;
  paciente: Paciente | null = null;
  historial: HistorialMedico | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private pacientesService: PacientesService,
    private historialService: HistorialMedicoService
  ) {
    this.form = this.fb.group({
      nombre: [{ value: '', disabled: false }, [Validators.required]],
      appat: [{ value: '', disabled: false }, [Validators.required]],
      apmat: [{ value: '', disabled: false }, [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });

    this.historialForm = this.fb.group({
  alergias: [''],
  enfermedadesCronicas: [''],
  adicciones: [''],
  discapacidades: ['']
});

  }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'PACIENTE') {
      this.error = 'No se pudo identificar al paciente.';
      this.loading = false;
      return;
    }

    const uid = Number(user.idPaciente || user.id);

    if (uid) {
      this.loadData(uid);
    } else {
      this.error = 'Error de sesión (ID no encontrado)';
      this.loading = false;
    }
  }

  loadData(id: number) {
    // 1. Get Patient Info
    this.pacientesService.getById(id).subscribe({
      next: (p) => {
        this.paciente = p;
        this.form.patchValue({
          nombre: p.nombre,
          appat: p.appat,
          apmat: p.apmat,
          correo: p.correo,
          telefono: p.telefono,
          direccion: p.direccion,
          fechaNacimiento: p.fechaNacimiento ? p.fechaNacimiento.split('T')[0] : ''
        });
        this.loadHistory(id);
      },
      error: (e) => {
        console.error(e);
        this.error = 'Error al cargar perfil.';
        this.loading = false;
      }
    });
  }

  loadHistory(pacienteId: number) {
  this.historialService.getAll().subscribe({
    next: (all) => {
      this.historial =
        all.find(h => h.paciente?.idPaciente === pacienteId) || null;

      if (this.historial) {
        this.historialForm.patchValue({
          alergias: this.historial.alergias,
          enfermedadesCronicas: this.historial.enfermedadesCronicas,
          adicciones: this.historial.adicciones,
          discapacidades: this.historial.discapacidades
        });
      }

      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}

  saveHistorial() {
    this.historialError = '';
    this.historialSuccess = '';

    if (!this.paciente?.idPaciente) return;

    this.historialSaving = true;

    const payload = {
      alergias: this.historialForm.value.alergias,
      enfermedadesCronicas: this.historialForm.value.enfermedadesCronicas,
      adicciones: this.historialForm.value.adicciones,
      discapacidades: this.historialForm.value.discapacidades,
      pacienteId: this.paciente.idPaciente
    };

    if (this.historial?.idHistorialMedico) {
      this.historialService
        .update(this.historial.idHistorialMedico, payload)
        .subscribe({
          next: (updated) => {
            this.historial = updated;
            this.historialSuccess = 'Historial actualizado correctamente';
            this.historialSaving = false;
          },
          error: (e) => {
            console.error(e);
            this.historialError = 'Error al actualizar historial';
            this.historialSaving = false;
          }
        });
    }

    else {
      this.historialService.create(payload).subscribe({
        next: (created) => {
          this.historial = created;
          this.historialSuccess = 'Historial creado correctamente';
          this.historialSaving = false;
        },
        error: (e) => {
          console.error(e);
          this.historialError = 'Error al crear historial';
          this.historialSaving = false;
        }
      });
    }
  }

  save() {
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.paciente || !this.paciente.idPaciente) return;

    this.saving = true;
    const payload: Paciente = {
      ...this.paciente,
      ...this.form.getRawValue()
    };

    this.pacientesService.update(this.paciente.idPaciente, payload).subscribe({
      next: (updated) => {
        this.paciente = updated;
        this.auth.setUser({ ...this.auth.getUser(), ...updated });
        this.success = 'Perfil actualizado correctamente';
        this.saving = false;
      },
      error: (e) => {
        console.error(e);
        this.error = 'Error al guardar cambios.';
        this.saving = false;
      }
    });
  }
}
