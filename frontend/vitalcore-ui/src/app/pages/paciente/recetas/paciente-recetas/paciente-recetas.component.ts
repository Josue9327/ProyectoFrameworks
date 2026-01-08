import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { RecetasService } from '../../../../core/services/recetas.service';
import { Receta } from '../../../../core/models/receta.model';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-paciente-recetas',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './paciente-recetas.component.html',
  styleUrls: ['./paciente-recetas.component.scss']
})
export class PacienteRecetasComponent implements OnInit {
  loading = true;
  error = '';
  recetas: Receta[] = [];

  constructor(
    private recetasService: RecetasService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'PACIENTE') {
      this.error = 'No se pudo identificar al paciente.';
      this.loading = false;
      return;
    }

    this.recetasService.getAll().subscribe({
      next: (all) => {
        const uid = Number(user.idPaciente || user.id);

        if (!uid) {
          this.error = 'Error en datos de sesión (ID no encontrado).';
          this.loading = false;
          return;
        }

        this.recetas = all.filter(r => r.pacienteId === uid);
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.error = 'No se pudieron cargar las recetas.';
        this.loading = false;
      }
    });
  }
}
