import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true; // 已登入，允許訪問
    } else {
      this.router.navigate(['/login']); // 無 token，重導至 login
      return false;
    }
  }
}
