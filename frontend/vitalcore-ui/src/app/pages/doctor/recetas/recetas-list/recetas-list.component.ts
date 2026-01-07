import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../../../../core/services/recetas.service';
import { Receta } from '../../../../core/models/receta.model';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recetas-list',
  standalone: true,
  imports: [CommonModule, TableModule, RouterModule],
  templateUrl: './recetas-list.component.html',
  styleUrls: ['./recetas-list.component.scss']
})
export class RecetasListComponent implements OnInit {
  recetas: Receta[] = [];
  loading = true;
  error = '';

  constructor(
    private recetasService: RecetasService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if (!user || user.rol !== 'DOCTOR') {
      this.error = 'No se pudo identificar al doctor.';
      this.loading = false;
      return;
    }

    this.recetasService.getAll().subscribe({
      next: (all) => {
        const doctorId = user.idDoctor || user.id;
        if (!doctorId) {
          this.error = 'Error en los datos de sesión.';
          this.loading = false;
          return;
        }
        this.recetas = all.filter(r => r.doctorId === doctorId);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar las recetas.';
        this.loading = false;
      }
    });
  }
}