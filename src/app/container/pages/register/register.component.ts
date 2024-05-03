import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegisterData } from '../../../models/register.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  nationalIDLength: number = 0;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.submitted = true;
    if (
      !this.email ||
      !this.fullName ||
      !this.nationalID ||
      this.nationalID.length !== 16 || // Check if National ID contains exactly 16 characters
      !this.cellName
    ) {
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
        this.toastr.success('Registration successful');
        this.clearForm();
        this.submitted = false;
      },
      (error) => {
        if (error && error.error && error.error.message) {
          const errorMessage = error.error.message;
          this.modalMessage = errorMessage;
          this.showModal = true;
          this.toastr.error(error.error.message);
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
    // Update the length of the National ID input whenever it changes
    this.nationalIDLength = this.nationalID.length;

    // Disable the input field if it reaches 16 characters
    if (this.nationalIDLength === 16) {
      const nationalIDInputElement = document.getElementById(
        'nationalIDInput'
      ) as HTMLInputElement;
      if (nationalIDInputElement) {
        nationalIDInputElement.disabled = true;
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }
}
