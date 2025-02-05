import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-person-data-list',
  templateUrl: './person-data-list.component.html',
  styleUrls: ['./person-data-list.component.css']
})
export class PersonDataListComponent implements OnInit {
  personDataList!: FormArray<FormGroup>; // 存儲可編輯的表單資料
  lockedDataList: any[] = []; // 存儲已鎖定的資料

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.personDataList = new FormArray<FormGroup>([]);
  }

  addPersonData(data: any) {
    const newPerson = this.fb.group({
      name: [data.name],
      gender: [data.gender],
      country: [data.country],
      region: [data.region],
      terms: [data.terms],
      editing: [false]
    });

    this.personDataList.push(newPerson);
    console.log("🔍 personDataList 更新:", this.personDataList.value);
  }

  lockData(index: number) {
    const lockedItem = this.personDataList.at(index).value;
    this.lockedDataList.push(lockedItem); // 存入鎖定數據
    this.personDataList.removeAt(index);
    console.log("🔒 lockedDataList:", this.lockedDataList);
  }
}
