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
  doctorId: number | null = null;
  citaIdToDelete: number | null = null;
  showModal: boolean = false;

  constructor(
    private citasService: CitasService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'DOCTOR') {
      this.error = 'No se pudo identificar al doctor.';
      this.loading = false;
      return;
    }

    this.doctorId = Number(user.idDoctor || user.id);
    if (!this.doctorId) {
      this.error = 'Error en los datos de sesión.';
      this.loading = false;
      return;
    }

    this.citasService.getAll().subscribe({
      next: (all) => {
        this.citas = all.filter(cita => cita.doctor.idDoctor === this.doctorId);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las citas.';
        this.loading = false;
      }
    });
  }

  combineDateAndTime(fecha: string, hora: string): Date {
    const dateTimeString = `${fecha}T${hora}`;
    return new Date(dateTimeString);
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

  confirmDelete(citaId: number): void {
    this.citaIdToDelete = citaId;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteCitaConfirmed(): void {
    if (this.citaIdToDelete !== null) {
      this.citasService.remove(this.citaIdToDelete).subscribe({
        next: () => {
          this.citas = this.citas.filter(cita => cita.idCita !== this.citaIdToDelete);
          this.showModal = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo eliminar la cita.';
        }
      });
    }
  }
}
