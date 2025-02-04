import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.css']
})
export class EnterDataComponent implements OnInit {
  userForm!: FormGroup;
  submittedDataList: any[] = [];
  editingIndex: number | null = null;

  countryOptions = ['台灣', '美國', '日本', '韓國'];
  regionOptions: { [key: string]: string[] } = {
    '台灣': ['台北','桃園','台中','台南','高雄'],
    '美國': ['紐約','洛杉磯','芝加哥','休士頓','費城'],
    '日本': ['東京', '大阪', '京都','橫濱','名古屋'],
    '韓國': ['首爾','釜山','仁川','光州','大分']
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

    this.userForm.get('country')?.valueChanges.subscribe(country => {
      this.selectedRegion$.next(this.regionOptions[country] || []);
      this.userForm.get('region')?.setValue('');
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (this.editingIndex !== null) {
        this.submittedDataList[this.editingIndex] = formData;
        this.editingIndex = null;
      } else {
        this.submittedDataList.push(formData);
      }
      this.userForm.reset();
      this.userForm.patchValue({ terms: false });
    }
  }

  editForm(index: number) {
    this.editingIndex = index;
    this.userForm.patchValue(this.submittedDataList[index]);
  }

  exportJson() {
    const jsonStr = JSON.stringify(this.submittedDataList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-data.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
