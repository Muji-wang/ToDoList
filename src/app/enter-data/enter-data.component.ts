import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-enter-data',
  templateUrl: './enter-data.component.html',
  styleUrls: ['./enter-data.component.css']
})
export class EnterDataComponent {
  userForm: FormGroup;
  countryOptions: string[] = ['台灣', '美國', '日本', '韓國'];
  
  regions = {
    '台灣': ['台北', '桃園', '台中', '台南', '高雄'],
    '美國': ['紐約', '洛杉磯', '芝加哥', '休士頓', '費城'],
    '日本': ['東京', '大阪', '京都', '橫濱', '名古屋'],
    '韓國': ['首爾', '釜山', '大邱', '仁川', '光州']
  };
  selectedRegion$ = new BehaviorSubject<string[]>([]);
  submittedData: any = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      gender: ['male'],
      country: ['', Validators.required],
      region: [''],
      terms: [false, Validators.requiredTrue]
    });

    this.userForm.get('country')?.valueChanges.subscribe(country => {
      this.selectedRegion$.next(this.regions[country as keyof typeof this.regions] || []);
      this.userForm.get('region')?.setValue('');
    });
  }

  submitForm() {
    if (this.userForm.valid) {
      this.submittedData = this.userForm.value;
    } else {
      alert('請填寫完整表單！');
    }
  }

  editForm() {
    if (this.submittedData) {
      this.userForm.setValue(this.submittedData);
      this.submittedData = null;
    }
  }

  exportJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.userForm.value, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "formData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  }
}
