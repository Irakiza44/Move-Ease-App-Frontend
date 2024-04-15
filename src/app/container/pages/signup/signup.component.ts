import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  submitted = false;

  onSubmit(email: string, password: string, confirmPassword: string) {
    this.submitted = true;

    if (!email || !password || !confirmPassword) {
      return;
    }

    if (!this.isValidEmail(email)) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    // Your signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
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
