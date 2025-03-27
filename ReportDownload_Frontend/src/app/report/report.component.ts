import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})

export class ReportComponent implements OnInit {
  reportForm = new FormGroup({
    frequency: new FormControl(''),
    year: new FormControl(''),
    month: new FormControl(''),
    dateRange: new FormControl(''),
    dailyDate: new FormControl(''),
    selectedLocation: new FormControl(''),
  });

  reportList: string[] = [];
  selectedReports: string[] = [];
  yearList: number[] = [];
  monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dateRanges = ['1(Month) - 10(Month)', '11(Month) - 20(Month)', '21(Month) - 30/31(Month)'];
  locationList: string[] = [];
  summaryText = '';
  selectedFrequency: string = '';
  currentDate: string = new Date().toISOString().split('T')[0]; //  Restrict date selection to today or earlier

  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    //  Check authentication on page load
    if (!this.authService.isLoggedIn()) {
      this.logout(); //  Log out and redirect if not authenticated
    }
  }

  ngOnInit(): void {
    this.loadYearList();
    this.loadReportList();
    this.loadLocationList();
  }

  //  Load years from CSV
  loadYearList(): void {
    this.http.get('assets/years.csv', { responseType: 'text' }).subscribe((data) => {
      console.log('Raw Year Data:', data); // Log raw response
      this.yearList = data.split('\n').map((year) => parseInt(year.trim())).filter((year) => !isNaN(year));
    });
  }

  //  Load reports from CSV
  loadReportList(): void {
    this.http.get('assets/reports.csv', { responseType: 'text' }).subscribe((data) => {
      this.reportList = data.split('\n').map((report) => report.trim()).filter((report) => report !== '');
    });
  }

  //  Load locations from CSV
  loadLocationList(): void {
    this.http.get('assets/locations.csv', { responseType: 'text' }).subscribe((data) => {
      this.locationList = data.split('\n').map((location) => location.trim()).filter((location) => location !== '');
    });
  }

  onReportSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedReports = Array.from(target.selectedOptions, (option) => option.value);
  }

  onMonthSelect() {
    console.log('Month selected:', this.reportForm.value.month);
  }

  updateSummaryText() {
    this.summaryText = `You selected ${this.reportForm.value.frequency} frequency.`;
  }

  generatedFilename: string = '';
  generateReport() {
    if (!this.selectedReports.length) {
      alert("Please select at least one report.");
      return;
    }
  
    const selectedReport = this.selectedReports.join('_').replace(/\s+/g, '_'); //  Replace spaces with underscores
    const selectedDate = this.selectedFrequency === 'Daily' 
      ? this.reportForm.value.dailyDate 
      : `${this.reportForm.value.month}_${this.reportForm.value.year}`;
  
    if (!selectedDate) {
      alert("Please select a valid date.");
      return;
    }
  
    const selectedLocation = this.reportForm.value.selectedLocation 
      ? this.reportForm.value.selectedLocation.replace(/\s+/g, '_') 
      : 'Unknown_Location';
  
    const fileName = `${selectedReport}_${selectedDate}_${selectedLocation}.pdf`;
  
    //  Ensure fileName doesn't have undefined/null values
    if (fileName.includes("undefined") || fileName.includes("null")) {
      alert("Error: Missing required fields for report generation.");
      return;
    }
  
    alert(`Report Generated: ${fileName}`);
  
    //  Store the generated filename for later use (e.g., downloading)
    this.generatedFilename = fileName;
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); //  Redirect to login page
  }

  //  Resets the form when frequency changes
  onFrequencyChange() {
    const selectedFrequency = this.reportForm.get('frequency')?.value || '';

    //  Reset form while keeping the selected frequency
    this.reportForm.reset();
    this.reportForm.patchValue({ frequency: selectedFrequency });

    //  Update selectedFrequency for UI conditionals
    this.selectedFrequency = selectedFrequency;

    //  Clear dependent fields
    if (selectedFrequency === 'Daily') {
      this.reportForm.patchValue({ dailyDate: '' });
    } else if (selectedFrequency === 'Monthly') {
      this.reportForm.patchValue({ year: '', month: '' });
    } else if (selectedFrequency === 'Periodic') {
      this.reportForm.patchValue({ year: '', month: '', dateRange: '' });
    }
  }
}
