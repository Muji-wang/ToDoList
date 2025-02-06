import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.css']
})
export class DataEditComponent {
  @Input() submittedData: any[] = [];
  @Output() editRequest = new EventEmitter<{ index: number; updatedData: any }>();
  @Output() deleteRequest = new EventEmitter<number>();

  isEditing: boolean[] = [];
  availableRegions: { [key: number]: string[] } = {};

  countryOptions = ['台灣', '美國', '日本', '韓國'];
  regionOptions: { [key: string]: string[] } = {
    '台灣': ['台北', '桃園', '台中', '台南', '高雄'],
    '美國': ['紐約', '洛杉磯', '芝加哥', '休士頓', '費城'],
    '日本': ['東京', '大阪', '京都', '橫濱', '名古屋'],
    '韓國': ['首爾', '釜山', '仁川', '光州', '大邱']
  };

  constructor() {}

  ngOnInit() {
    this.initializeEditingState();
  }

  initializeEditingState() {
    this.isEditing = new Array(this.submittedData.length).fill(false);
    this.submittedData.forEach((data: any, i: number) => {
      this.availableRegions[i] = this.regionOptions[data.country] || [];
    });
  }

  startEditing(index: number) {
    this.isEditing[index] = true;
    this.updateRegionOptions(index);
  }

  confirmEdit(index: number) {
    if (this.submittedData[index].name && this.submittedData[index].region) {
      this.editRequest.emit({ index, updatedData: this.submittedData[index] });
      this.isEditing[index] = false;
    }
  }

  deleteForm(index: number) {
    this.deleteRequest.emit(index);
  }

  updateRegionOptions(index: number) {
    const selectedCountry = this.submittedData[index]?.country;
    this.availableRegions[index] = this.regionOptions[selectedCountry] || [];
    
    if (!this.availableRegions[index].includes(this.submittedData[index].region)) {
      this.submittedData[index].region = this.availableRegions[index][0] || ''; // 預設選擇第一個地區
    }
  }
}
