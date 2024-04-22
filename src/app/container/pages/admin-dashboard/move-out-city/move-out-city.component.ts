import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-move-out-city',
  templateUrl: './move-out-city.component.html',
  styleUrls: ['./move-out-city.component.css'],
})
export class MoveOutCityComponent implements OnInit {
  contacts: any[] = [];
  filteredContacts: any[] = [];
  searchInput: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  searchSubject = new Subject<string>();

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadContacts();
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.onSearch();
      });
  }

  loadContacts(): void {
    this.adminService.getBackupContacts().subscribe((response) => {
      this.contacts = response.backupContacts; // Corrected property name here
      this.filteredContacts = [...this.contacts];
    });
  }

  onSearch(): void {
    this.filteredContacts = this.contacts.filter(
      (contact) =>
        contact.cellname
          .toLowerCase()
          .includes(this.searchInput.toLowerCase()) ||
        contact.name.toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.setPage(1);
  }

  getPagesArray(): number[] {
    const pageCount = Math.ceil(
      this.filteredContacts.length / this.itemsPerPage
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

  getPagedContacts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredContacts.slice(startIndex, endIndex);
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
