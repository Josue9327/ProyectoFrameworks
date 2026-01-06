import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router) { }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get user(): any {
    return this.auth.getUser();
  }

  get isPaciente(): boolean {
    const u = this.user;
    return u && u.rol === 'PACIENTE';
  }

  get isDoctor(): boolean {
    const u = this.user;
    return u && u.rol === 'DOCTOR';
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}