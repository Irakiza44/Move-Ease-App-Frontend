import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LoginData } from '../../../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(email: string, password: string) {
    this.submitted = true;

    if (!email || !password) {
      return;
    }

    if (!this.isValidEmail(email)) {
      return;
    }

    const loginData: LoginData = {
      email,
      password,
    };

    this.authService.login(loginData).subscribe(
      (response) => {
        if (response.role === 'user') {
          this.router.navigate(['/home']);
        } else if (response.role === 'admin') {
          this.router.navigate(['/admin']);
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  onInputChange() {
    this.submitted = false;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
