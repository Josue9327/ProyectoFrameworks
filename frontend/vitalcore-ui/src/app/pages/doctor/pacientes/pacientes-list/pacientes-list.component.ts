import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PacientesService } from '../../../../core/services/pacientes.service';
import { Paciente } from '../../../../core/models/paciente.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-pacientes-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TableModule, ButtonModule, InputTextModule],
  templateUrl: './pacientes-list.component.html',
  styleUrl: './pacientes-list.component.scss'
})
export class PacientesListComponent implements OnInit {
  loading = true;
  error = '';
  search = '';

  rows: Paciente[] = [];
  filtered: Paciente[] = [];

  constructor(private pacientes: PacientesService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.pacientes.getAll().subscribe({
      next: (data) => {
        this.rows = data ?? [];
        this.applyFilter();
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.error = 'No se pudo cargar pacientes.';
        this.loading = false;
      }
    });
  }

  applyFilter() {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filtered = [...this.rows];
      return;
    }
    this.filtered = this.rows.filter(p => {
      // Adjusted fields to match local model (appat, apmat)
      const full = `${p.nombre ?? ''} ${p.appat ?? ''} ${p.apmat ?? ''} ${p.correo ?? ''}`.toLowerCase();
      return full.includes(q);
    });
  }

  delete(p: Paciente) {
    const id = p.idPaciente;
    if (!id) return;

    if (!confirm(`¿Eliminar a ${p.nombre}?`)) return;

    this.pacientes.remove(id).subscribe({
      next: () => this.load(),
      error: (e) => {
        console.error(e);
        alert('No se pudo eliminar.');
      }
    });
  }
}
