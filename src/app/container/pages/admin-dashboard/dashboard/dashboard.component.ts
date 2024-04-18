import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalContacts: number = 0;
  totalBackups: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
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
}
