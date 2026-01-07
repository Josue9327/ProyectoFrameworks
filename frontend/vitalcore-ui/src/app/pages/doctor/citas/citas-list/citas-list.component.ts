import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../../core/services/citas.service';
import { Cita } from '../../../../core/models/cita.model';
import { AuthService } from '../../../../core/services/auth.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CommonModule, TableModule, RouterModule],
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.scss']
})
export class CitasListComponent implements OnInit {
  citas: Cita[] = [];
  loading = true;
  error = '';

  constructor(
    private citasService: CitasService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'DOCTOR') {
      this.error = 'No se pudo identificar al doctor.';
      this.loading = false;
      return;
    }

    this.citasService.getAll().subscribe({
      next: (all) => {
        const doctorId = user.idDoctor || user.id;
        if (!doctorId) {
          this.error = 'Error en los datos de sesión.';
          this.loading = false;
          return;
        }
        this.citas = all.filter(c => c.doctorId === doctorId);
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
    if (citaDate < now) return 'Atendida / Pasada';
    return 'Pendiente';
  }

  getStatusClass(fecha: string): string {
    const status = this.getStatus(fecha);
    return status.includes('Pendiente') ? 'status-pending' : 'status-done';
  }
}