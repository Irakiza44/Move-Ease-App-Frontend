import { Component } from '@angular/core';
import { SurveyService } from '../../../services/survey.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent {
  cellName: string = '';
  transportation: string = '';
  movingCompanies: string = '';
  costOfFood: string = '';
  health: string = '';
  rentOfHouse: string = '';

  constructor(
    private surveyService: SurveyService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    const surveyData = {
      cellName: this.cellName,
      transportation: this.transportation,
      movingCompanies: this.movingCompanies,
      costOfFood: this.costOfFood,
      health: this.health,
      rentOfHouse: this.rentOfHouse,
    };

    this.surveyService.postSurvey(surveyData).subscribe(
      (response) => {
        this.toastr.success('Survey posted successfully');
        this.resetForm();
        this.router.navigate(['/budgeting-Tools']);
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }

  resetForm(): void {
    this.cellName = '';
    this.transportation = '';
    this.movingCompanies = '';
    this.costOfFood = '';
    this.health = '';
    this.rentOfHouse = '';
  }
}
