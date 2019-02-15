import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private zone: NgZone,
  ) {
  }

  login() {
    this.authService.login().subscribe(() => {
      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }
}
