import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.css']
})
export class EnterDataComponent implements OnInit {
  userForm!: FormGroup;
  personDataList!: FormArray<FormGroup>; 
  countryOptions: string[] = ['台灣', '美國', '日本', '韓國'];

  regions: { [key: string]: string[] } = {
    '台灣': ['台北', '桃園', '台中', '台南', '高雄'],
    '美國': ['紐約', '洛杉磯', '芝加哥', '休士頓', '費城'],
    '日本': ['東京', '大阪', '京都', '橫濱', '名古屋'],
    '韓國': ['首爾', '釜山', '大邱', '仁川', '光州']
  };
  selectedRegion$ = new BehaviorSubject<string[]>([]);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      region: [''],
      terms: [false, Validators.requiredTrue]
    });
    this.personDataList = this.fb.array([] as FormGroup[]);

    this.userForm.get('country')?.valueChanges.subscribe((country: string) => {
      this.selectedRegion$.next(this.regions[country] || []);
      this.userForm.get('region')?.setValue('');
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const newPerson: FormGroup = this.fb.group({
        name: [this.userForm.get('name')?.value || '', Validators.required],
        gender: [this.userForm.get('gender')?.value || '', Validators.required],
        country: [this.userForm.get('country')?.value || '', Validators.required],
        region: [this.userForm.get('region')?.value || ''],
        terms: [this.userForm.get('terms')?.value || false],
        editing: [false]
      });
  
      this.personDataList.push(newPerson);
      console.log("🔍 目前所有資料:", this.personDataList.value);
  
      this.userForm.reset();
      this.userForm.patchValue({ terms: false });
    }
  }
  

  editItem(index: number) {
    this.personDataList.at(index).patchValue({ editing: true });
  }

  saveItem(index: number) {
    this.personDataList.at(index).patchValue({ editing: false });
  }
}
