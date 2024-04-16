import { Component } from '@angular/core';
import { SurveyService } from '../../../services/survey.service';
import { Router } from '@angular/router';

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

  constructor(private surveyService: SurveyService, private router: Router) {}

  onSubmit(): void {
    console.log('Submit button clicked');

    const surveyData = {
      cellName: this.cellName,
      transportation: this.transportation,
      movingCompanies: this.movingCompanies,
      costOfFood: this.costOfFood,
      health: this.health,
      rentOfHouse: this.rentOfHouse,
    };

    console.log('Form Data:', surveyData);

    this.surveyService.postSurvey(surveyData).subscribe(
      (response) => {
        console.log('Survey posted successfully', response);
        // Optionally, you can reset the form here
        this.resetForm();
        this.router.navigate(['/budgeting-Tools']);
      },
      (error) => {
        console.error('Error posting survey', error);
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
