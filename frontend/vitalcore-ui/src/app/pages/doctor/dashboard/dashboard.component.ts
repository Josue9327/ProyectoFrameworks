import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../../core/services/citas.service';
import { RecetasService } from '../../../core/services/recetas.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  citasCount = 0;
  recetasCount = 0;
  error = '';

  constructor(
    private citasService: CitasService,
    private recetasService: RecetasService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'DOCTOR') {
      this.error = 'No se pudo identificar al doctor.';
      return;
    }

    const doctorId = user.idDoctor || user.id;
    if (!doctorId) {
      this.error = 'Error en los datos de sesión.';
      return;
    }

    this.citasService.getAll().subscribe((citas) => {
      const citasDoctor = citas.filter(cita => {
        return cita.doctor.idDoctor === doctorId;
      });
      this.citasCount = citasDoctor.length;
    });

    this.recetasService.getAll().subscribe((recetas) => (this.recetasCount = recetas.length));
  }
}
