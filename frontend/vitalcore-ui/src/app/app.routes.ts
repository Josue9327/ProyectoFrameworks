import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

import { PacientesListComponent } from './pages/doctor/pacientes/pacientes-list/pacientes-list.component';
import { PacientesDetailComponent } from './pages/doctor/pacientes/pacientes-detail/pacientes-detail.component';
import { PacientesFormComponent } from './pages/doctor/pacientes/pacientes-form/pacientes-form.component';

import { PacienteDashboardComponent } from './pages/paciente/dashboard/paciente-dashboard/paciente-dashboard.component';
import { PacienteCitasComponent } from './pages/paciente/citas/paciente-citas/paciente-citas.component';
import { PacienteRecetasComponent } from './pages/paciente/recetas/paciente-recetas/paciente-recetas.component';
import { PacientePerfilComponent } from './pages/paciente/perfil/paciente-perfil/paciente-perfil.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  // Doctor - Pacientes
  { path: 'doctor/pacientes', component: PacientesListComponent },
  { path: 'doctor/pacientes/nuevo', component: PacientesFormComponent },
  { path: 'doctor/pacientes/:id', component: PacientesDetailComponent },
  { path: 'doctor/pacientes/:id/editar', component: PacientesFormComponent },

  // Paciente
  { path: 'paciente/dashboard', component: PacienteDashboardComponent },
  { path: 'paciente/citas', component: PacienteCitasComponent },
  { path: 'paciente/recetas', component: PacienteRecetasComponent },
  { path: 'paciente/perfil', component: PacientePerfilComponent },

  { path: '**', redirectTo: '' }
];