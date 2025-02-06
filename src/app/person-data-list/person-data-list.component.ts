import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-person-data-list',
  templateUrl: './person-data-list.component.html',
  styleUrls: ['./person-data-list.component.css']
})
export class PersonDataListComponent {
  submittedData$ = new BehaviorSubject<any[]>([]);

  onFormSubmitted(newData: any[]) {
    this.submittedData$.next([...newData]);
  }

  // 修改某筆數據
  editForm(index: number, updatedData: any) {
    const currentData = this.submittedData$.getValue();
    currentData[index] = updatedData;
    this.submittedData$.next([...currentData]);
  }

  // 刪除某筆數據
  deleteForm(index: number) {
    const currentData = this.submittedData$.getValue();
    currentData.splice(index, 1);
    this.submittedData$.next([...currentData]);
  }
}
