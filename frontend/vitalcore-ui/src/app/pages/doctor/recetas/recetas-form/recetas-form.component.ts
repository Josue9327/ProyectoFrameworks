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
      idTratamiento: [null, Validators.required]
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
          idTratamiento: data.tratamiento.idTratamiento
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

  const recetaData: any = this.recetaForm.value;  // Usamos 'any' para no forzar un tipo incompatible

  // Asegúrate de incluir el 'idTratamiento' en los datos enviados
  if (this.recetaId) {
    recetaData.idReceta = this.recetaId;  // Incluye el idReceta si estás actualizando
  }

  console.log('Datos a enviar en la solicitud PUT:', recetaData);

  // Enviar la solicitud de creación o actualización
  if (this.recetaId) {
    this.recetasService.update(this.recetaId, recetaData).subscribe({
      next: () => {
        console.log('Receta actualizada con éxito');
        this.router.navigate(['/doctor/recetas']);
      },
      error: (err) => {
        console.error('Error actualizando la receta', err);
        alert('Hubo un error al intentar actualizar la receta. Por favor, intente nuevamente.');
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
        alert('Hubo un error al intentar crear la receta. Por favor, intente nuevamente.');
      }
    });
  }
}

}
