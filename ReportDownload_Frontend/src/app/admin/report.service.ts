import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reports: string[] = ['Sales Report', 'Revenue Report', 'Employee Report']; // Initial reports
  private reportsSubject = new BehaviorSubject<string[]>(this.reports);  // Observable for the report list
  reportList$ = this.reportsSubject.asObservable();  // Expose the report list to subscribers

  addReport(report: string) {
    if (report && !this.reports.includes(report)) {
      this.reports.push(report);  // Add the new report to the list
      console.log('Report added:', report);
      this.reportsSubject.next(this.reports);  // Notify subscribers
    }
  }

  removeReport(report: string) {
    this.reports = this.reports.filter(r => r !== report);
    console.log('Report removed:', report);
    this.reportsSubject.next(this.reports);  // Notify subscribers
  }
}
