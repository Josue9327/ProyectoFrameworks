import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitasService } from '../../../../core/services/citas.service';
import { TipoCitaService } from '../../../../core/services/tipo-cita.service';  // Asegúrate de tener este servicio
import { Cita } from '../../../../core/models/cita.model';
import { AuthService } from '../../../../core/services/auth.service';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { DoctoresService } from '../../../../core/services/doctores.service';

@Component({
  selector: 'app-citas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss']
})
export class CitasFormComponent implements OnInit {
  citaForm: FormGroup;
  loading = false;
  tiposCita: any[] = [];
  pacientes: any[] = [];
  doctores: any[] = [];
  citaId?: number;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private tiposCitaService: TipoCitaService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService,
    private auth: AuthService
  ) {
    this.citaForm = this.fb.group({
      pacienteId: [null, Validators.required],
      doctorId: [null, Validators.required],
      tipoCitaId: [null, Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.tiposCitaService.getTiposCita().subscribe({
      next: (data) => {
        this.tiposCita = data;
      },
      error: (err) => {
        console.error('Error cargando los tipos de cita', err);
      }
    });

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

    this.loading = false;
  }

  saveCita() {
  if (this.citaForm.invalid) return;

  const citaData: Cita = this.citaForm.value;

  if (citaData.fecha) {
    citaData.fecha = new Date(citaData.fecha).toISOString().split('T')[0];
  }
  if (citaData.hora) {
    citaData.hora = citaData.hora + ":00";
  }

  console.log('Datos de la cita:', citaData);

  this.citasService.create(citaData).subscribe({
    next: () => {
      console.log('Cita guardada con éxito');
    },
    error: (err) => {
      console.error('Error guardando la cita', err);
    }
  });
}
}
