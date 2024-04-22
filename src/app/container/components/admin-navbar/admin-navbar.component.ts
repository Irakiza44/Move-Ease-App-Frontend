import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  email: string = '';
  role: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      (response) => {
        this.email = response.email;
        this.role = response.role;
      },
      (error) => {
        console.error('Error loading current user:', error);
      }
    );
  }
}
