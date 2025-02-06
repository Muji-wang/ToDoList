import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.css']
})
export class EnterDataComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any[]>();

  userForm!: FormGroup;
  submittedDataList$ = new BehaviorSubject<any[]>([]);
  editingIndex: number | null = null;

  countryOptions = ['台灣', '美國', '日本', '韓國'];
  regionOptions: { [key: string]: string[] } = {
    '台灣': ['台北', '桃園', '台中', '台南', '高雄'],
    '美國': ['紐約', '洛杉磯', '芝加哥', '休士頓', '費城'],
    '日本': ['東京', '大阪', '京都', '橫濱', '名古屋'],
    '韓國': ['首爾', '釜山', '仁川', '光州', '大邱']
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

    // 監聽 country 變更，更新 region 選項
    this.userForm.get('country')?.valueChanges.subscribe(country => {
      if (country) {
        this.selectedRegion$.next(this.regionOptions[country] || []);
        this.userForm.get('region')?.setValidators(Validators.required);
      } else {
        this.selectedRegion$.next([]);
        this.userForm.get('region')?.clearValidators();
      }
      this.userForm.get('region')?.updateValueAndValidity();
      this.userForm.get('region')?.setValue('');
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const currentData = this.submittedDataList$.getValue();

      if (this.editingIndex !== null) {
        currentData[this.editingIndex] = formData;
        this.editingIndex = null;
      } else {
        currentData.push(formData);
      }

      this.submittedDataList$.next([...currentData]);
      this.formSubmitted.emit([...currentData]);
      this.userForm.reset();
      this.userForm.patchValue({ terms: false });
    }
  }
}
