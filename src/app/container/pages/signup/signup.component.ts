import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  submitted = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {} // Inject AuthService

  onSubmit(email: string, password: string, confirmPassword: string) {
    this.submitted = true;
    this.errorMessage = '';

    if (!email || !password || !confirmPassword) {
      return;
    }

    if (!this.isValidEmail(email)) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const userData = {
      email: email,
      password: password,
      reEnteredPassword: confirmPassword,
    };

    this.authService.signup(userData).subscribe(
      (response) => {
        this.toastr.success('Sign Up Ssuccessful');
        this.router.navigate(['/logIn']);
      },
      (error) => {
        this.toastr.error(
          error.error.message || 'An error occurred. Please try again.'
        );
      }
    );
  }

  onInputChange() {
    this.submitted = false;
  }

  isValidEmail(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
