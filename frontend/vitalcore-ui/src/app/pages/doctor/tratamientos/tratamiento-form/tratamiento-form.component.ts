import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TratamientosService } from '../../../../core/services/tratamientos.service';
import { Tratamiento } from '../../../../core/models/tratamiento.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, TableModule ]
})
export class TratamientoFormComponent implements OnInit {
  tratamientoForm: FormGroup;
  loading = false;
  tratamientoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tratamientosService: TratamientosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tratamientoForm = this.fb.group({
      diagnostico: ['', Validators.required],
      idCita: [null, Validators.required] // Asumiendo que el tratamiento está asociado a una cita
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.tratamientoId = +params.get('id')!;
      if (this.tratamientoId) {
        this.loadTratamiento(this.tratamientoId);
      } else {
        this.loading = false;
      }
    });
  }

  loadTratamiento(id: number): void {
    this.tratamientosService.getById(id).subscribe({
      next: (data: Tratamiento) => {
        this.tratamientoForm.patchValue({
          diagnostico: data.diagnostico,
          idCita: data.idCita,
        });
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar tratamiento', err);
        alert('Error al cargar los detalles del tratamiento.');
        this.loading = false;
      }
    });
  }

  saveTratamiento(): void {
    if (this.tratamientoForm.invalid) return;

    const tratamientoData: Tratamiento = this.tratamientoForm.value;

    if (this.tratamientoId) {
      tratamientoData['idTratamiento'] = this.tratamientoId;
    }

    console.log('Datos a enviar:', tratamientoData);

    if (this.tratamientoId) {
      this.tratamientosService.update(this.tratamientoId, tratamientoData).subscribe({
        next: () => {
          console.log('Tratamiento actualizado con éxito');
          this.router.navigate(['/doctor/tratamientos']);
        },
        error: (err) => {
          console.error('Error actualizando tratamiento', err);
          alert('Hubo un error al intentar actualizar el tratamiento. Por favor, intente nuevamente.');
        }
      });
    } else {
      this.tratamientosService.create(tratamientoData).subscribe({
        next: () => {
          console.log('Tratamiento creado con éxito');
          this.router.navigate(['/doctor/tratamientos']);
        },
        error: (err) => {
          console.error('Error creando tratamiento', err);
          alert('Hubo un error al intentar crear el tratamiento. Por favor, intente nuevamente.');
        }
      });
    }
  }
}
