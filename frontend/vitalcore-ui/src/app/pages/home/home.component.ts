import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {
  colors = [
    { hex: '#613F0A', name: 'Café oscuro' },
    { hex: '#3875A1', name: 'Azul medio' },
    { hex: '#0A3D61', name: 'Azul principal' },
    { hex: '#B68C4F', name: 'Café claro' },
    { hex: '#87BEE0', name: 'Azul secundario' },
    { hex: '#FFE7C3', name: 'Crema' },
  ];
}