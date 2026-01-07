import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

import { PacienteDashboardComponent } from './pages/paciente/dashboard/paciente-dashboard/paciente-dashboard.component';
import { PacienteCitasComponent } from './pages/paciente/citas/paciente-citas/paciente-citas.component';
import { PacienteRecetasComponent } from './pages/paciente/recetas/paciente-recetas/paciente-recetas.component';
import { PacientePerfilComponent } from './pages/paciente/perfil/paciente-perfil/paciente-perfil.component';

import { DashboardComponent } from './pages/doctor/dashboard/dashboard.component';
import { CitasListComponent } from './pages/doctor/citas/citas-list/citas-list.component';
import { CitasFormComponent } from './pages/doctor/citas/citas-form/citas-form.component';
import { RecetasListComponent } from './pages/doctor/recetas/recetas-list/recetas-list.component';
import { RecetasFormComponent } from './pages/doctor/recetas/recetas-form/recetas-form.component';
import { PacientesListComponent } from './pages/doctor/pacientes/pacientes-list/pacientes-list.component';
import { PacientesDetailComponent } from './pages/doctor/pacientes/pacientes-detail/pacientes-detail.component';
import { PacientesFormComponent } from './pages/doctor/pacientes/pacientes-form/pacientes-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },

  { path: 'paciente/dashboard', component: PacienteDashboardComponent },
  { path: 'paciente/citas', component: PacienteCitasComponent },
  { path: 'paciente/recetas', component: PacienteRecetasComponent },
  { path: 'paciente/perfil', component: PacientePerfilComponent },

  { path: 'doctor/dashboard', component: DashboardComponent },
  { path: 'doctor/citas', component: CitasListComponent },
  { path: 'doctor/citas/nueva', component: CitasFormComponent },
  { path: 'doctor/citas/:id', component: CitasFormComponent },
  { path: 'doctor/recetas', component: RecetasListComponent },
  { path: 'doctor/recetas/nueva', component: RecetasFormComponent },
  { path: 'doctor/recetas/:id', component: RecetasFormComponent },
  { path: 'doctor/pacientes', component: PacientesListComponent },
  { path: 'doctor/pacientes/nuevo', component: PacientesFormComponent },
  { path: 'doctor/pacientes/:id', component: PacientesDetailComponent },
  { path: 'doctor/pacientes/:id/editar', component: PacientesFormComponent },

  { path: '**', redirectTo: '' }
];