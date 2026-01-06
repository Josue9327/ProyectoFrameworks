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
      nombre: [{ value: '', disabled: false }, [Validators.required]], // Editable as requested
      appat: [{ value: '', disabled: false }, [Validators.required]],
      apmat: [{ value: '', disabled: false }, [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'PACIENTE') {
      this.error = 'No se pudo identificar al paciente.';
      this.loading = false;
      return;
    }

    const uid = user.idPaciente || user.id;

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

        // 2. Get History (after patient loaded)
        // Note: HistorialMedicoController doesn't have "getByPacienteId".
        // It only has "getAll" or "getById". We have to filter all (not efficient but necessary with current backend)
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
        // Filter history where h.paciente.idPaciente == pacienteId
        this.historial = all.find(h => (h as any).paciente && (h as any).paciente.idPaciente === pacienteId) || null;
        this.loading = false;
      },
      error: (e) => {
        console.warn('No se pudo cargar historial o no existe', e);
        // Not critical error for profile view
        this.loading = false;
      }
    });
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

    // Fix date format if needed or backend accepts YYYY-MM-DD string directly?
    // Entity uses Date. String 'YYYY-MM-DD' usually works if backend parses it OR sends UTC.
    // The previous form component used raw value. I'll stick to that.

    this.pacientesService.update(this.paciente.idPaciente, payload).subscribe({
      next: (updated) => {
        this.paciente = updated;
        this.auth.setUser({ ...this.auth.getUser(), ...updated }); // Update session info too
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
