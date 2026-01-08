import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../../core/services/citas.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Cita } from '../../../../core/models/cita.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-paciente-citas',
  templateUrl: './paciente-citas.component.html',
  styleUrls: ['./paciente-citas.component.scss'],
    imports: [ReactiveFormsModule, CommonModule, RouterModule, TableModule ]
})
export class PacienteCitasComponent implements OnInit {
  loading = true;
  error = '';
  citas: Cita[] = [];

  constructor(
    private citasService: CitasService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'PACIENTE') {
      this.error = 'No se pudo identificar al paciente.';
      this.loading = false;
      return;
    }

    this.citasService.getAll().subscribe({
      next: (all) => {
        const uid = Number(user.idPaciente || user.id);

        if (!uid) {
          this.error = 'Error en datos de sesión (ID no encontrado).';
          this.loading = false;
          return;
        }

        // Filtrar las citas por el idPaciente
        this.citas = all.filter(cita => cita.paciente.idPaciente === uid);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las citas.';
        this.loading = false;
      }
    });
  }

  getStatus(fecha: string): string {
    const citaDate = new Date(fecha);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    citaDate.setHours(0, 0, 0, 0);

    if (citaDate < now) {
      return 'Atendida / Pasada';
    }
    return 'Pendiente';
  }

  getStatusClass(fecha: string): string {
    const status = this.getStatus(fecha);
    if (status.includes('Pendiente')) {
      return 'status-pending';
    }
    return 'status-done';
  }
}
