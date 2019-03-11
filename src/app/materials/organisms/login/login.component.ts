import { Component, NgZone, Input } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router,
              private zone: NgZone,
              private authService: AuthService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
                iconRegistry.addSvgIcon(
                  'google',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons8-google.svg'));

                iconRegistry.addSvgIcon(
                  'github',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons8-github.svg'));
              }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(() => {
      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }

  loginWithGithub() {
    this.authService.loginWithGithub().subscribe(() => {
      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }

  loginWithEmail(form: NgForm) {
    console.log(form);
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginWithEmail(email, password).subscribe(() => {
      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }

}
