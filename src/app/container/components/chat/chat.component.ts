import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from '../../../services/admin.service';

interface UsersResponse {
  totalUsers: number;
}

interface ContactsResponse {
  contacts: { cellname: string | number }[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  public chart: any;
  public contactsData: { cellname: string; count: number }[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.adminService.getContacts().subscribe(
      (response: ContactsResponse) => {
        const cellCounts: { [key: string]: number } = {};

        response.contacts.forEach((contact) => {
          const key = String(contact.cellname);
          cellCounts[key] = (cellCounts[key] || 0) + 1;
        });

        this.contactsData = Object.keys(cellCounts).map((cell) => ({
          cellname: cell,
          count: cellCounts[cell],
        }));

        this.createChart();
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.contactsData.map((data) => data.cellname),
        datasets: [
          {
            label: 'Citizens',
            data: this.contactsData.map((data) => data.count),
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
