import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  passwordPattern = "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{10,}$";

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      notRobot: [false, Validators.requiredTrue]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.router.navigate(['/todo-list']);
    }
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return '此欄位為必填';
      }
      if (field.errors['pattern']) {
        if (fieldName === 'email') {
          return '請輸入有效的信箱';
        }
        if (fieldName === 'password') {
          return '密碼需至少10位且包含英文字母與數字';
        }
      }
    }
    return '';
  }
}
