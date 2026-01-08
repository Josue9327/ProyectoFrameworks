import { Component, OnInit } from '@angular/core';
import { TratamientosService } from '../../../../core/services/tratamientos.service';
import { Tratamiento } from '../../../../core/models/tratamiento.model';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tratamiento-list',
  templateUrl: './tratamiento-list.component.html',
  styleUrls: ['./tratamiento-list.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TableModule ]
})
export class TratamientoListComponent implements OnInit {
  tratamientos: Tratamiento[] = [];
  loading = true;
  error = '';

  constructor(
    private tratamientosService: TratamientosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTratamientos();
  }

  loadTratamientos(): void {
    this.tratamientosService.getAll().subscribe({
      next: (data: Tratamiento[]) => {
        this.tratamientos = data;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'Error al cargar los tratamientos.';
        this.loading = false;
        console.error('Error al cargar tratamientos:', err);
      }
    });
  }

  deleteTratamiento(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tratamiento?')) {
      this.tratamientosService.remove(id).subscribe({
        next: () => {
          this.loadTratamientos();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error al eliminar tratamiento', err);
          alert('Hubo un error al intentar eliminar el tratamiento. Por favor, intente nuevamente.');
        }
      });
    }
  }
}
