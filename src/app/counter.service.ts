import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counterSubject = new BehaviorSubject<number>(0); 
  // 創建一個 BehaviorSubject,並將初始值設定為 0
  counter$ = this.counterSubject.asObservable(); 
  // 讓元件可以訂閱計數器的變化

  increment() {
    const currentValue = this.counterSubject.value;
    this.counterSubject.next(currentValue + 1);
  }

  decrement() {
    const currentValue = this.counterSubject.value;
    
    // 確保數值不低於 0
    if (currentValue > 0) { 
      this.counterSubject.next(currentValue - 1);
    }else {
      alert('數值不可低於 0');
    }
  }

  reset() {
    this.counterSubject.next(0); // 重置為 0
  }
}
