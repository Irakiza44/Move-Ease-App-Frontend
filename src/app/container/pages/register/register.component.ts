import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  submitted = false;

  onSubmit(
    email: string,
    fullName: string,
    nationalID: string,
    cellName: string
  ) {
    this.submitted = true;

    if (!email || !fullName || !nationalID || !cellName) {
      return;
    }

    if (!this.isValidEmail(email)) {
      return;
    }

    // Your registration logic here
    console.log('Email:', email);
    console.log('Full Name:', fullName);
    console.log('National ID:', nationalID);
    console.log('Cell Name:', cellName);
  }

  onInputChange(inputField: HTMLInputElement) {
    inputField.classList.remove('error');
    this.submitted = false;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
