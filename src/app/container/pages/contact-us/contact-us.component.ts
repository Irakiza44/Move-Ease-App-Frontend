import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SurveyService } from '../../../services/survey.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  contact = {
    names: '',
    email: '',
    telephone: '',
  };

  constructor(
    private surveyService: SurveyService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const contactData = {
        name: this.contact.names,
        email: this.contact.email,
        telephone: this.contact.telephone,
      };
      this.surveyService.postContactUs(contactData).subscribe(
        (response) => {
          this.toastr.success('Thank you for Contacting Us');
          this.clearForm();
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    }
  }
  clearForm() {
    this.contact.names = '';
    this.contact.email = '';
    this.contact.telephone = '';
  }
}
