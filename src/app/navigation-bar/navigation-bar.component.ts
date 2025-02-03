import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // 清除 token
    this.router.navigate(['/login']); // 導向登入頁
  }
}
