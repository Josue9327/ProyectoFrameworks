import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

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
    this.updateUserState();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateUserState();
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

  goToDashboard() {
    if (this.isLoggedIn) {
      if (this.isPaciente) {
        this.router.navigateByUrl('/paciente/dashboard');
      } else if (this.isDoctor) {
        this.router.navigateByUrl('/doctor/dashboard');
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }

  goToInicio() {
    if (this.isLoggedIn) {
      if (this.isPaciente) {
        this.router.navigateByUrl('/paciente/dashboard');
      } else if (this.isDoctor) {
        this.router.navigateByUrl('/doctor/dashboard');
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
