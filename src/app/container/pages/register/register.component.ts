import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegisterData } from '../../../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  submitted = false;
  email = '';
  fullName = '';
  nationalID = '';
  cellName = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    console.log('Submitting form...');
    this.submitted = true;

    if (!this.email || !this.fullName || !this.nationalID || !this.cellName) {
      console.log('Form data is incomplete.');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      console.log('Invalid email format.');
      return;
    }

    const userData: RegisterData = {
      name: this.fullName,
      email: this.email,
      natinalId: this.nationalID,
      cellname: this.cellName,
    };

    console.log('User Data:', userData);

    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        alert('Registration successful');
        this.clearForm();
        this.submitted = false;
      },
      (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed');
      }
    );
  }

  clearForm() {
    this.email = '';
    this.fullName = '';
    this.nationalID = '';
    this.cellName = '';
  }

  onInputChange() {
    this.submitted = false;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
