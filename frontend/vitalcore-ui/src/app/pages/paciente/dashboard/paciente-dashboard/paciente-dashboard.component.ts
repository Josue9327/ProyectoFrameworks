import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-paciente-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paciente-dashboard.component.html',
  styleUrl: './paciente-dashboard.component.scss'
})
export class PacienteDashboardComponent implements OnInit {

  paciente = {
    nombre: 'Juan Pérez',
    medico: 'Dra. María López',
    proximaCita: '2026-01-10',
    recetasActivas: 2
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (user && user.nombre) {
      this.paciente.nombre = `${user.nombre} ${user.appat || ''} ${user.apmat || ''}`.trim();
    }
  }
}
