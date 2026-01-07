import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CitasService } from '../../../core/services/citas.service';
import { RecetasService } from '../../../core/services/recetas.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  citasCount = 0;
  recetasCount = 0;

  constructor(private citas: CitasService, private recetas: RecetasService) {}

  ngOnInit(): void {
    this.citas.getAll().subscribe((citas) => (this.citasCount = citas.length));
    this.recetas.getAll().subscribe((recetas) => (this.recetasCount = recetas.length));
  }
}