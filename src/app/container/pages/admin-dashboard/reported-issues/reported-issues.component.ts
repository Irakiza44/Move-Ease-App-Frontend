import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../../services/issue.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reported-issues',
  templateUrl: './reported-issues.component.html',
  styleUrls: ['./reported-issues.component.css'],
})
export class ReportedIssuesComponent implements OnInit {
  issues: any[] = [];
  filteredIssues: any[] = [];
  searchInput: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  searchSubject = new Subject<string>();

  constructor(private issueService: IssueService) {}

  ngOnInit(): void {
    this.loadIssues();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.onSearch();
      });
  }

  loadIssues(): void {
    this.issueService.getIssues().subscribe((response) => {
      this.issues = response.issues;
      this.filteredIssues = [...this.issues];
    });
  }

  onSearch(): void {
    this.filteredIssues = this.issues.filter(
      (issue) =>
        issue.cellName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        issue.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.setPage(1);
  }

  getPagesArray(): number[] {
    const pageCount = Math.ceil(this.filteredIssues.length / this.itemsPerPage);
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

  getPagedIssues(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredIssues.slice(startIndex, endIndex);
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

  onSearchInputChanged(): void {
    this.searchSubject.next(this.searchInput);
  }
}
