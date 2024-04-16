import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegisterData } from '../../../models/register.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  showModal = false;
  modalMessage = '';
  _id: string = '';

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  onSubmit() {
    this.submitted = true;
    if (!this.email || !this.fullName || !this.nationalID || !this.cellName) {
      return;
    }
    if (!this.isValidEmail(this.email)) {
      return;
    }

    const userData: RegisterData = {
      name: this.fullName,
      email: this.email,
      natinalId: this.nationalID,
      cellname: this.cellName,
    };

    this.authService.register(userData).subscribe(
      (response) => {
        alert('Registration successful');
        this.clearForm();
        this.submitted = false;
      },
      (error) => {
        if (error && error.error && error.error.message) {
          const errorMessage = error.error.message;
          this.modalMessage = errorMessage;
          this.showModal = true;
        }
        this._id = error.error._id;
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  handleNo() {
    this.closeModal();
  }

  handleYes() {
    if (this._id) {
      this.authService.deleteContact(this._id).subscribe(
        (response) => {
          this.closeModal();
          this.clearForm();
          this.submitted = false;
        },
        (error) => {
          if (error && error.error && error.error.message) {
            const errorMessage = error.error.message;
            this.modalMessage = errorMessage;
            this.showModal = true;
          }
        }
      );
    }
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
