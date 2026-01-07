import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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