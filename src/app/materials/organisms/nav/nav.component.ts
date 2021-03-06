import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone) {}

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.zone.run(() => {
        localStorage.clear();
        this.router.navigate(['/']);
      });
    });
  }
}
