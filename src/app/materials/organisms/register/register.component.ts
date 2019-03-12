import { Component, NgZone } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,
              private router: Router,
              private zone: NgZone) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.register(email, password).subscribe(() => {
      this.zone.run(() => {
        this.router.navigate(['/users']);
      });
    });
  }
}
