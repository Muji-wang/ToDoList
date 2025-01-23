import { Component } from '@angular/core';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css']
})
export class AnimeComponent {
  isCircle = false; // 初始狀態為非 circle

  toggleCircle() {
    this.isCircle = !this.isCircle; // 點擊時切換狀態
}
}
