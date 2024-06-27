import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VisitorService } from '../../../services/visitor.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-vistors',
  templateUrl: './vistors.component.html',
  styleUrls: ['./vistors.component.css'],
})
export class VistorsComponent implements OnInit {
  visitorForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private visitorService: VisitorService,
    private authService: AuthService
  ) {
    this.visitorForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      cellName: ['', Validators.required],
      address: ['', Validators.required],
      dateOfArrival: ['', Validators.required],
      timeOfDeparture: ['', Validators.required],
      purposeOfVisit: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.visitorForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.visitorForm.invalid) {
      return;
    }

    const visitorData = this.visitorForm.value;
    this.loading = true;

    this.visitorService.reportVisitor(visitorData).subscribe(
      (response) => {
        this.toastr.success('Visitor reported successfully');
        this.clearForm();
      },
      (error) => {
        this.toastr.error(error.message);
        this.loading = false;
      }
    );
  }

  clearForm(): void {
    this.visitorForm.reset();
    this.submitted = false;
    this.loading = false;
  }
}
