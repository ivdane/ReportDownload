import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import * as Papa from 'papaparse';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  validUsers: { username: string; password: string }[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.loadUserData();
  }

  ngOnInit() {
    //  Log out users if they refresh the page
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  loadUserData() {
    Papa.parse('/assets/users.csv', {
      download: true,
      header: true,
      complete: (result) => {
        this.validUsers = result.data as { username: string; password: string }[];
      },
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    const user = this.validUsers.find((u) => u.username === username && u.password === password);
    
    if (user) {
      this.authService.login(username!, password!);
      this.router.navigate(['/reports']);
    } else {
      alert('Invalid credentials!');
    }
  }
}
