import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent {
  @Input() dataList: any[] = [];

  exportJson() {
    const jsonStr = JSON.stringify(this.dataList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
