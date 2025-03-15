// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  pin: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.authService.validatePin(this.pin)) {
      this.authService.setLoggedIn(true);
      this.router.navigate(['/']); // Navigate to a secure page after successful login
    } else {
      this.errorMessage = 'Invalid PIN. Please try again.';
    }
  }
}
