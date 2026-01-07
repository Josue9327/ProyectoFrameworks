import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { Paciente } from '../../../../core/models/paciente.model';

@Component({
  selector: 'app-pacientes-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pacientes-detail.component.html',
  styleUrl: './pacientes-detail.component.scss'
})
export class PacientesDetailComponent implements OnInit {
  loading = true;
  error = '';
  paciente: Paciente | null = null;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private pacientes: PacientesService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'ID inválido';
      this.loading = false;
      return;
    }

    this.pacientes.getById(id).subscribe({
      next: (p) => { 
        this.paciente = p; 
        this.loading = false; 
      },
      error: (e) => { 
        console.error(e); 
        this.error = 'No se pudo cargar el paciente.'; 
        this.loading = false; 
      }
    });
  }

  changePassword(newPassword: string) {
    if (this.paciente) {
      this.paciente.password = newPassword;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}