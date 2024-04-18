import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { SurveyService } from '../../../../services/survey.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalContacts: number = 0;
  totalBackups: number = 0;
  surveys: any[] = [];
  filteredSurveys: any[] = [];
  searchInput: string = '';
  currentPage = 1;
  itemsPerPage = 7;

  constructor(
    private adminService: AdminService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
    this.adminService.getUsers().subscribe(
      (usersResponse) => {
        this.totalUsers = usersResponse.totalUsers;
      },
      (error) => {}
    );

    this.adminService.getContacts().subscribe(
      (contactsResponse) => {
        this.totalContacts = contactsResponse.totalUsers;
      },
      (error) => {}
    );
    this.adminService.getBackupContacts().subscribe(
      (backupContactsResponse) => {
        this.totalBackups = backupContactsResponse.totalUsers;
      },
      (error) => {}
    );
  }

  loadSurveys(): void {
    this.surveyService.getSurveys().subscribe((response) => {
      this.surveys = response.data;
      this.filteredSurveys = [...this.surveys];
    });
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
