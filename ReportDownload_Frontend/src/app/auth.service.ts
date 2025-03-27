import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username && password) { // Allow any valid username/password
      localStorage.setItem('isAuthenticated', 'true'); // ✅ Store auth status
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated'); // ✅ Clear auth status on logout
    this.router.navigate(['/']); // ✅ Redirect to login page after logout
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true'; // ✅ Always check localStorage
  }
}
