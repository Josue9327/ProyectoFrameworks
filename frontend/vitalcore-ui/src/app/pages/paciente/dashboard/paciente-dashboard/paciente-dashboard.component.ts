import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CorreoService } from '../../../../core/services/correo.service';

@Component({
  selector: 'app-paciente-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paciente-dashboard.component.html',
  styleUrl: './paciente-dashboard.component.scss'
})
export class PacienteDashboardComponent implements OnInit {

  paciente = {
    nombre: '',
    correo: '',
    medico: 'No asignado',
    proximaCita: 'Sin cita',
    recetasActivas: 0
  };

  mensaje = '';
  error = '';

  constructor(
    private auth: AuthService,
    private correoService: CorreoService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user) {
      this.error = 'No se pudo cargar la información del paciente';
      return;
    }
    this.paciente.nombre = `${user.nombre} ${user.appat || ''} ${user.apmat || ''}`.trim();
    this.paciente.correo = user.correo;
  }

  enviarReportePorCorreo(): void {
    if (!this.paciente.correo) {
      this.error = 'No se encontró el correo del paciente';
      return;
    }

    this.correoService.enviarPDFCorreo(this.paciente.correo).subscribe({
      next: (resp) => {
        console.log(resp);
        this.mensaje = '📧 El reporte fue enviado correctamente a tu correo';
        this.error = '';
      },
      error: (err) => {
        console.error(err);
        this.error = '❌ Error al enviar el correo';
        this.mensaje = '';
      }
    });
  }
}
