import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../../../services/visitor.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css'],
})
export class VisitorsComponent implements OnInit {
  visitors: any[] = [];
  filteredVisitors: any[] = [];
  searchInput: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  searchSubject = new Subject<string>();

  constructor(private visitorService: VisitorService) {}

  ngOnInit(): void {
    this.loadVisitors();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.onSearch();
      });
  }

  loadVisitors(): void {
    this.visitorService.getVisitors().subscribe((response) => {
      this.visitors = response.visitors;
      this.filteredVisitors = [...this.visitors];
    });
  }

  onSearch(): void {
    this.filteredVisitors = this.visitors.filter(
      (visitor) =>
        visitor.cellName
          .toLowerCase()
          .includes(this.searchInput.toLowerCase()) ||
        visitor.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.setPage(1);
  }

  getPagesArray(): number[] {
    const pageCount = Math.ceil(
      this.filteredVisitors.length / this.itemsPerPage
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

  getPagedVisitors(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredVisitors.slice(startIndex, endIndex);
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
