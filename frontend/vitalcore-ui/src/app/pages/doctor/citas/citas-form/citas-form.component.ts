import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitasService } from '../../../../core/services/citas.service';
import { TipoCitaService } from '../../../../core/services/tipo-cita.service';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { DoctoresService } from '../../../../core/services/doctores.service';
import { Cita } from '../../../../core/models/cita.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class CitasFormComponent implements OnInit {
  citaForm: FormGroup;
  loading = false;
  tiposCita: any[] = [];
  pacientes: any[] = [];
  doctores: any[] = [];
  citaId?: number;
  errorMessage: string = '';
  showConfirmModal = false;
  showSuccessModal = false;
  showSuccessModalCreate = false;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private tiposCitaService: TipoCitaService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService,
    private route: ActivatedRoute,
    private router: Router
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
        this.errorMessage = 'No se pudieron cargar los tipos de cita. Inténtelo más tarde.';
        this.loading = false;
      }
    });

    this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (err) => {
        console.error('Error cargando los pacientes', err);
        this.errorMessage = 'No se pudieron cargar los pacientes. Inténtelo más tarde.';
        this.loading = false;
      }
    });

    this.doctoresService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (err) => {
        console.error('Error cargando los doctores', err);
        this.errorMessage = 'No se pudieron cargar los doctores. Inténtelo más tarde.';
        this.loading = false;
      }
    });

    this.route.paramMap.subscribe(params => {
      this.citaId = +params.get('id')!;
      if (this.citaId) {
        this.loadCita(this.citaId);
      } else {
        this.loading = false;
      }
    });
  }

  loadCita(id: number): void {
    this.citasService.getById(id).subscribe({
      next: (cita: Cita) => {
        this.citaForm.patchValue({
          pacienteId: cita.paciente.idPaciente,
          doctorId: cita.doctor.idDoctor,
          tipoCitaId: cita.tipoCita.idTipoCita,
          fecha: cita.fecha,
          hora: cita.hora
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar la cita', err);
        this.errorMessage = 'No se pudo cargar la cita. Inténtelo más tarde.';
        this.loading = false;
      }
    });
  }

  saveCita() {
    if (this.citaForm.invalid) return;

    const citaData: Cita = this.citaForm.value;

    if (citaData.fecha) {
      citaData.fecha = new Date(citaData.fecha).toISOString().split('T')[0];
    }

    if (this.citaId) {
      console.log('Actualizando cita con id:', this.citaId, citaData);
      this.citasService.update(this.citaId, citaData).subscribe({
        next: (updatedCita) => {
          console.log('Cita actualizada con éxito', updatedCita);
          this.showSuccessModal = true;
          setTimeout(() => {
            this.router.navigate(['/doctor/citas']);
            this.showSuccessModal = false;
          }, 2000);
        },
        error: (err) => {
          console.error('Error al actualizar la cita', err);
        }
      });
    } else {
      console.log('Creando nueva cita', citaData);
      if (citaData.hora) {
        citaData.hora = citaData.hora + ":00";
      }
      this.citasService.create(citaData).subscribe({
        next: (newCita) => {
          console.log('Cita creada con éxito', newCita);
          this.showSuccessModalCreate = true;
          setTimeout(() => {
            this.router.navigate(['/doctor/citas']);
            this.showSuccessModalCreate = false;
          }, 2000);
        },
        error: (err) => {
          console.error('Error al crear la cita', err);
        }
      });
    }
  }

  confirmUpdate(): void {
    this.showConfirmModal = false;
    this.citasService.update(this.citaId!, this.citaForm.value).subscribe({
      next: (updatedCita) => {
        console.log('Cita actualizada con éxito', updatedCita);
        this.showSuccessModal = true;
        setTimeout(() => {
          this.router.navigate(['/doctor/citas']);
          this.showSuccessModal = false;
        }, 2000);
      },
      error: (err) => {
        console.error('Error al actualizar la cita', err);
      }
    });
  }

  createCita(citaData: Cita): void {
    this.citasService.create(citaData).subscribe({
      next: (newCita) => {
        console.log('Cita creada con éxito', newCita);
        this.router.navigate(['/doctor/citas']);
      },
      error: (err) => {
        console.error('Error al crear la cita', err);
        this.errorMessage = 'Hubo un problema al crear la cita. Por favor, intente más tarde.';
      }
    });
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }
}
