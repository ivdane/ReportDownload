import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReportService } from './report.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  newReport: string = '';

  constructor(private reportService: ReportService) {}

  get reportList() {
    return this.reportService.reportList$;
  }

  addReport() {
    if (this.newReport) {
      this.reportService.addReport(this.newReport);
      this.newReport = '';
      
    } else {
      alert('Report name is required');
    }
  }

  removeReport(report: string) {
    this.reportService.removeReport(report);
  }
}
