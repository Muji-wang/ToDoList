import { Component } from '@angular/core';
import { CounterService } from '../counter.service';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.css']
})
export class ComponentBComponent {
  counter = 0;

  constructor(private counterService: CounterService) {
    this.counterService.counter$.subscribe(value => {
      this.counter = value;
    });
  }
}
