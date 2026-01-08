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
      medicamentos: ['', Validators.required],
      dosis: ['', Validators.required],
      idTratamiento: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.tratamientosService.getAll().subscribe({
      next: (data) => {
        this.tratamientos = data;
      },
      error: (err) => {
        console.error('Error cargando tratamientos', err);
      }
    });

    this.route.paramMap.subscribe((params) => {
      this.recetaId = +params.get('id')!;
      if (this.recetaId) {
        this.loadReceta(this.recetaId);
      } else {
        this.loading = false;
      }
    });
  }

  loadReceta(id: number): void {
    this.recetasService.getById(id).subscribe({
      next: (data: Receta) => {
        this.recetaToEdit = data;
        this.recetaForm.patchValue({
          medicamentos: data.medicamento,
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

    const recetaData: any = this.recetaForm.value
    if (this.recetaId) {
      recetaData.idReceta = this.recetaId;
    }

    console.log('Datos a enviar en la solicitud PUT:', recetaData);

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
