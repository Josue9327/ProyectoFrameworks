import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetasService } from '../../../../core/services/recetas.service';
import { Receta } from '../../../../core/models/receta.model';
import { TratamientosService } from '../../../../core/services/tratamientos.service';
import { Tratamiento } from '../../../../core/models/tratamiento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recetas-form',
  templateUrl: './recetas-form.component.html',
  styleUrls: ['./recetas-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RecetasFormComponent implements OnInit {
  recetaForm: FormGroup;
  recetaId: number | null = null;
  loading = false;
  tratamientos: Tratamiento[] = [];
  recetaToEdit: Receta | null = null;

  constructor(
    private fb: FormBuilder,
    private recetasService: RecetasService,
    private tratamientosService: TratamientosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recetaForm = this.fb.group({
      medicamento: ['', Validators.required],
      dosis: ['', Validators.required],
      tratamientoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = true;

    // Cargar tratamientos disponibles
    this.tratamientosService.getAll().subscribe({
      next: (data) => {
        this.tratamientos = data;
      },
      error: (err) => {
        console.error('Error cargando tratamientos', err);
      }
    });

    // Obtener el ID de la receta desde la URL
    this.route.paramMap.subscribe((params) => {
      this.recetaId = +params.get('id')!;
      if (this.recetaId) {
        this.loadReceta(this.recetaId);  // Cargar los detalles de la receta
      } else {
        this.loading = false;
      }
    });
  }

  // Cargar la receta para editarla
  loadReceta(id: number): void {
    this.recetasService.getById(id).subscribe({
      next: (data: Receta) => {
        this.recetaToEdit = data;
        this.recetaForm.patchValue({
          medicamento: data.medicamento,
          dosis: data.dosis,
          tratamientoId: data.tratamiento.idTratamiento
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar receta', err);
      }
    });
  }
saveReceta(): void {
  if (this.recetaForm.invalid) return;

  const recetaData: Receta = this.recetaForm.value;
  console.log('Datos a enviar en la solicitud PUT:', recetaData);

  if (this.recetaId) {
    recetaData.idReceta = this.recetaId;  // Asegúrate de que el ID esté presente en la solicitud

    // Actualizar receta
    this.recetasService.update(this.recetaId, recetaData).subscribe({
      next: () => {
        console.log('Receta actualizada con éxito');
        this.router.navigate(['/doctor/recetas']);
      },
      error: (err) => {
        console.error('Error actualizando la receta', err);
      }
    });
  } else {
    this.recetasService.create(recetaData).subscribe({
      next: () => {
        console.log('Receta creada con éxito');
        this.router.navigate(['/doctor/recetas']);
      },
      error: (err) => {
        console.error('Error creando la receta', err);
      }
    });
  }
}
}
