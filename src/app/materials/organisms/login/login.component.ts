import { Component, NgZone } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-o-login',
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
              sanitizer: DomSanitizer,
              private data: DatabaseService) {
                iconRegistry.addSvgIcon(
                  'google',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons8-google.svg'));

                iconRegistry.addSvgIcon(
                  'github',
                  sanitizer.bypassSecurityTrustResourceUrl('assets/icons/icons8-github.svg'));
              }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe((resp) => {
      console.log('hello', resp);
      this.sendUser(resp);

      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }

  loginWithGithub() {
    this.authService.loginWithGithub().subscribe((resp) => {

      this.zone.run(() => {
        this.sendUser(resp);
        this.router.navigate(['/users']);
      });
    });
  }

  loginWithEmail(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.loginWithEmail(email, password).subscribe((resp) => {
      this.sendUser(resp);

      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }

  sendUser(resp) {
    console.log('resp.user', resp );
    const userInfo = {
      displayName: resp.user.displayName,
      email: resp.user.email,
      uid: resp.user.uid,
    };

    this.data.getUser(userInfo).subscribe(doc => {
      if (!doc.data()) {
        this.data.setUser(userInfo)
          .catch(err => console.error(err));
      } else {
        return;
      }
    });
  }
}
