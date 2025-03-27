import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportListSubject = new BehaviorSubject<string[]>(['Sales Report', 'Revenue Report', 'Employee Report', 'Inventory Report', 'Audit Report']);
  reportList$ = this.reportListSubject.asObservable();

  addReport(report: string) {
    const currentReports = this.reportListSubject.value;
    if (currentReports.length < 5) {
      currentReports.push(report);
      this.reportListSubject.next(currentReports);
    }
  }

  removeReport(report: string) {
    const currentReports = this.reportListSubject.value.filter(r => r !== report);
    this.reportListSubject.next(currentReports);
  }
}



