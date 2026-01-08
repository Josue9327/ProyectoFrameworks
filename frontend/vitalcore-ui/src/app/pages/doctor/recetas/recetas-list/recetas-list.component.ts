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
  showConfirmDeleteModal = false;
  recetaToDelete: Receta | null = null;

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
      next: (data: Receta[]) => {
        this.recetas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error cargando las recetas.';
        this.loading = false;
        console.error('Error al cargar recetas:', err);
      }
    });
  }

  confirmDelete(receta: Receta): void {
    this.recetaToDelete = receta;
    this.showConfirmDeleteModal = true;
  }

  deleteReceta(): void {
    if (this.recetaToDelete && this.recetaToDelete.idReceta) {
      this.recetasService.remove(this.recetaToDelete.idReceta).subscribe({
        next: () => {
          this.recetas = this.recetas.filter(r => r.idReceta !== this.recetaToDelete?.idReceta);
          this.showConfirmDeleteModal = false;
        },
        error: (err) => {
          this.error = 'Error al eliminar receta';
          console.error('Error al eliminar receta', err);
        }
      });
    }
  }

  closeConfirmDeleteModal(): void {
    this.showConfirmDeleteModal = false;
  }
}
