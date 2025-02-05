import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.css']
})
export class DataEditComponent implements OnInit {
  @Input() personDataList!: FormArray<FormGroup>;
 // 接收來自 `person-data-list` 的 FormArray

 constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log("🔍 傳遞到 data-edit 的 personDataList:", this.personDataList?.value);
  }

  editItem(index: number) {
    this.personDataList.at(index).patchValue({ editing: true });
    this.cdr.detectChanges(); // 強制刷新 Angular 變更偵測
    
  }
  
  saveItem(index: number) {
    this.personDataList.at(index).patchValue({ editing: false });
    this.cdr.detectChanges(); // 強制刷新 Angular 變更偵測
  }
  
  lockData(index: number) {
    this.personDataList.at(index).patchValue({ locked: true });
    this.cdr.detectChanges(); // 強制刷新 Angular 變更偵測
  }
}
