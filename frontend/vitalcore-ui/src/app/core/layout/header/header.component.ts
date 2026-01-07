import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';  // Importa NavigationEnd
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';  // Importa filter para filtrar los eventos de navegación

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isPaciente: boolean = false;
  isDoctor: boolean = false;
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Inicializamos el estado del usuario al cargar el componente
    this.updateUserState();

    // Escuchamos los cambios de navegación para actualizar el estado en cada cambio de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Filtramos los eventos de navegación
    ).subscribe(() => {
      this.updateUserState();  // Actualizamos el estado después de cada navegación
    });
  }

  updateUserState() {
    this.isLoggedIn = this.auth.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.auth.getUser();
      this.isPaciente = this.user?.rol === 'PACIENTE';
      this.isDoctor = this.user?.rol === 'DOCTOR';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
