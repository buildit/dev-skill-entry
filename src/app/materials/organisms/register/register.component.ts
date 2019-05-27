import { Component, NgZone } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-o-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  message: string;

  constructor(private authService: AuthService,
              private router: Router,
              private zone: NgZone,
              private data: DatabaseService) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.register(email, password).subscribe((resp) => {
      const userInfo = {
        displayName: resp.user.displayName,
        email: resp.user.email,
        uid: resp.user.uid,
      };

      // this.data.setUser(userInfo);

      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    },
      err => {
        this.message = err.message;
      });
  }
}
