import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from '../../../services/issue.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css'],
})
export class ReportIssueComponent implements OnInit {
  issueForm: FormGroup;
  submitted = false;
  loading = false; // Add loading property

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private issueService: IssueService,
    private authService: AuthService
  ) {
    this.issueForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, this.emailValidator]],
      cellName: ['', Validators.required],
      dateEncountered: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.issueForm.controls;
  }

  emailValidator(control: FormControl): { [key: string]: any } | null {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.issueForm.invalid) {
      return;
    }

    const issueData = this.issueForm.value;
    this.loading = true; // Set loading to true when submitting

    this.issueService.reportIssue(issueData).subscribe(
      (response) => {
        this.toastr.success('Issue reported successfully');
        this.clearForm();
        this.loading = false; // Set loading to false on success
      },
      (error) => {
        this.toastr.error(error.message);
        this.loading = false; // Set loading to false on error
      }
    );
  }

  clearForm(): void {
    this.issueForm.reset();
    this.submitted = false;
  }
}
