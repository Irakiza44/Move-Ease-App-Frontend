import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'app-budgeting',
  templateUrl: './budgeting.component.html',
  styleUrls: ['./budgeting.component.css'],
})
export class BudgetingComponent implements OnInit {
  surveys: any[] = [];
  filteredSurveys: any[] = [];
  searchInput: string = '';
  currentPage = 1;
  itemsPerPage = 8;

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe((response) => {
      this.surveys = response.data;
      this.filteredSurveys = [...this.surveys];
    });
  }

  onSearch(): void {
    this.filteredSurveys = this.surveys.filter((survey) =>
      survey.cellName.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.setPage(1);
  }

  getPagesArray(): number[] {
    const pageCount = Math.ceil(
      this.filteredSurveys.length / this.itemsPerPage
    );
    return new Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.currentPage * this.itemsPerPage;
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  getPagedSurveys(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredSurveys.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const lastPage = this.getPagesArray().length;
    if (this.currentPage < lastPage) {
      this.currentPage++;
    }
  }
}
