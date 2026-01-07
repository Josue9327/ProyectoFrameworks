import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecetasService } from '../../../../core/services/recetas.service';
import { TratamientosService } from '../../../../core/services/tratamientos.service';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { DoctoresService } from '../../../../core/services/doctores.service';
import { Receta } from '../../../../core/models/receta.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-recetas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recetas-form.component.html',
  styleUrls: ['./recetas-form.component.scss']
})
export class RecetasFormComponent implements OnInit {
  recetaForm: FormGroup;
  loading = false;
  pacientes: any[] = [];
  doctores: any[] = [];
  tratamientos: any[] = [];
  recetaId?: number;

  constructor(
    private fb: FormBuilder,
    private recetasService: RecetasService,
    private tratamientosService: TratamientosService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService,
    private auth: AuthService
  ) {
    this.recetaForm = this.fb.group({
      pacienteId: [null, Validators.required],
      doctorId: [null, Validators.required],
      medicamento: ['', Validators.required],
      dosis: ['', Validators.required],
      duracion: ['', Validators.required],
      tratamientoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error cargando los pacientes', err);
      }
    });

    this.doctoresService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (err) => {
        console.error('Error cargando los doctores', err);
      }
    });

    this.tratamientosService.getAll().subscribe({
      next: (data) => {
        this.tratamientos = data;
      },
      error: (err) => {
        console.error('Error cargando los tratamientos', err);
      }
    });

    this.loading = false;
  }

  saveReceta() {
    if (this.recetaForm.invalid) return;

    const recetaData: Receta = this.recetaForm.value;
    this.recetasService.create(recetaData).subscribe({
      next: () => {},
      error: (err) => {
        console.error('Error guardando la receta', err);
      }
    });
  }
}